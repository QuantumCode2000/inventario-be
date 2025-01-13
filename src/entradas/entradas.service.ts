import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { Entrada } from './entities/entrada.entity'; // Entidad para la tabla de entradas
import { Inventario } from '../inventarios/entities/inventario.entity'; // Entidad para la tabla de inventarios
import Decimal from 'decimal.js'; // Importamos Decimal.js

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(Entrada)
    private entradasRepository: Repository<Entrada>, // Repositorio para la tabla de entradas

    @InjectRepository(Inventario)
    private inventariosRepository: Repository<Inventario>, // Repositorio para la tabla de inventarios
  ) {}

  // Crear una nueva entrada
  async create(createEntradaDto: CreateEntradaDto) {
    const { codigo, cantidad, tipoEntrada, motivo } = createEntradaDto;

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
    const cantidadAAgregar = new Decimal(cantidad); // Convierte la cantidad a agregar a un objeto Decimal

    // Sumar las cantidades y redondear el resultado a 2 decimales
    const nuevaCantidad = cantidadActual
      .plus(cantidadAAgregar)
      .toDecimalPlaces(2); // Realiza la suma y redondea a 2 decimales

    // Actualizar la cantidad en el inventario
    inventario.cantidad = nuevaCantidad.toNumber(); // Convertimos el resultado a un número normal para guardarlo en la base de datos

    // Guardar los cambios en el inventario
    await this.inventariosRepository.save(inventario);

    // Crear la entrada
    const entrada = this.entradasRepository.create(createEntradaDto);

    // Guardar la entrada en la base de datos
    return await this.entradasRepository.save(entrada);
  }

  // Obtener todas las entradas
  async findAll() {
    return await this.entradasRepository.find();
  }

  // Obtener una entrada por ID
  async findOne(id: number) {
    const entrada = await this.entradasRepository.findOneBy({ id });
    if (!entrada) {
      throw new NotFoundException(`Entrada con ID ${id} no encontrada.`);
    }
    return entrada;
  }

  // Actualizar una entrada por ID
  async update(id: number, updateEntradaDto: UpdateEntradaDto) {
    const entrada = await this.findOne(id); // Verificar si la entrada existe
    Object.assign(entrada, updateEntradaDto); // Actualizar los campos
    return await this.entradasRepository.save(entrada);
  }

  // Eliminar una entrada de forma lógica
  async remove(id: number) {
    const entrada = await this.findOne(id); // Verificar si la entrada existe
    return await this.entradasRepository.softDelete(entrada.id); // Eliminación lógica
  }
}
