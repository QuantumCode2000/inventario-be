import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';
import { Salida } from './entities/salida.entity'; // Entidad para la tabla de salidas
import { Inventario } from '../inventarios/entities/inventario.entity'; // Entidad para la tabla de inventarios
import Decimal from 'decimal.js'; // Importamos Decimal.js para manejar la precisión de los decimales

@Injectable()
export class SalidasService {
  constructor(
    @InjectRepository(Salida)
    private salidasRepository: Repository<Salida>, // Repositorio para la tabla de salidas

    @InjectRepository(Inventario)
    private inventariosRepository: Repository<Inventario>, // Repositorio para la tabla de inventarios
  ) {}

  // Crear una nueva salida
  async create(createSalidaDto: CreateSalidaDto) {
    const { codigo, cantidad, motivo, destino, sacadoPor } = createSalidaDto;

    // Verificar si el item existe en el inventario
    const inventario = await this.inventariosRepository.findOne({
      where: { codigo },
    });

    if (!inventario) {
      throw new NotFoundException(
        `El código ${codigo} no existe en el inventario.`,
      );
    }

    // Usamos Decimal.js para manejar la cantidad de forma precisa
    const cantidadActual = new Decimal(inventario.cantidad); // Convierte la cantidad actual a un objeto Decimal
    const cantidadASacar = new Decimal(cantidad); // Convierte la cantidad a sacar a un objeto Decimal

    // Verificar si hay suficiente cantidad para la salida
    if (cantidadASacar.greaterThan(cantidadActual)) {
      throw new NotFoundException(
        `No hay suficiente cantidad en el inventario para la salida. Disponibles: ${cantidadActual.toString()}`,
      );
    }

    // Restar las cantidades y redondear el resultado a 2 decimales
    const nuevaCantidad = cantidadActual
      .minus(cantidadASacar)
      .toDecimalPlaces(2); // Realiza la resta y redondea a 2 decimales

    // Actualizar la cantidad en el inventario
    inventario.cantidad = nuevaCantidad.toNumber(); // Convertimos el resultado a un número normal para guardarlo en la base de datos

    // Guardar los cambios en el inventario
    await this.inventariosRepository.save(inventario);

    // Crear la salida
    const salida = this.salidasRepository.create(createSalidaDto);

    // Guardar la salida en la base de datos
    return await this.salidasRepository.save(salida);
  }

  // Obtener todas las salidas
  async findAll() {
    return await this.salidasRepository.find();
  }

  // Obtener una salida por ID
  async findOne(id: number) {
    const salida = await this.salidasRepository.findOneBy({ id });
    if (!salida) {
      throw new NotFoundException(`Salida con ID ${id} no encontrada.`);
    }
    return salida;
  }

  // Actualizar una salida por ID
  async update(id: number, updateSalidaDto: UpdateSalidaDto) {
    const salida = await this.findOne(id); // Verificar si la salida existe
    Object.assign(salida, updateSalidaDto); // Actualizar los campos
    return await this.salidasRepository.save(salida);
  }

  // Eliminar una salida de forma lógica
  async remove(id: number) {
    const salida = await this.findOne(id); // Verificar si la salida existe
    return await this.salidasRepository.softDelete(salida.id); // Eliminación lógica
  }
}
