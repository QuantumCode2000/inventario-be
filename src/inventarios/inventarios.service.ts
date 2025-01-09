import { Injectable, ConflictException, OnModuleInit } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';

@Injectable()
export class InventariosService implements OnModuleInit {
  constructor(
    @InjectRepository(Inventario)
    private inventariosRepository: Repository<Inventario>,
  ) {}

  // Método que se ejecuta cuando el módulo se inicia
  async onModuleInit() {
    // Verifica si ya existe un inventario predeterminado
    const inventarioExists = await this.inventariosRepository.findOneBy({
      codigoProducto: 'PROD0001', // Cambia esto por un identificador único para tu inventario predeterminado
    });

    if (!inventarioExists) {
      // Si no existe, crea un nuevo inventario predeterminado
      const defaultInventario: CreateInventarioDto = {
        codigoProducto: 'PROD0001', // Un identificador único
        descripcion: 'Producto Predeterminado',
        categoria: 'Categoria A',
        cantidadDisponible: '100',
        precioUnitario: '50',
        estado: 'disponible',
        registradoPor: 'Sistema',
        chofer: 'No Asignado',
        camion: 'No Asignado',
        nroNotaRemision: 'NR001',
        detalle: 'Producto de ejemplo creado al iniciar la aplicación',
      };

      // Crea y guarda el inventario predeterminado
      await this.create(defaultInventario);
    }
  }

  // async create(createInventarioDto: CreateInventarioDto) {
  //   const { codigoProducto } = createInventarioDto;

  //   // Verifica si el código de producto ya existe en la base de datos
  //   const existingProducto = await this.inventariosRepository.findOne({
  //     where: { codigoProducto },
  //   });

  //   if (existingProducto) {
  //     throw new Error('El código de producto ya existe.');
  //   }

  //   const inventario = this.inventariosRepository.create(createInventarioDto);
  //   return await this.inventariosRepository.save(inventario);
  // }

  async create(createInventarioDto: CreateInventarioDto) {
    const { codigoProducto } = createInventarioDto;

    // Verifica si el código de producto ya existe en la base de datos
    const existingProducto = await this.inventariosRepository.findOne({
      where: { codigoProducto },
    });

    if (existingProducto) {
      throw new ConflictException({
        message: 'El código de producto ya existe.',
        error: 'Conflict',
      });
    }

    const inventario = this.inventariosRepository.create(createInventarioDto);
    return await this.inventariosRepository.save(inventario);
  }

  async findAll() {
    return await this.inventariosRepository.find();
  }

  async findOne(id: number) {
    return await this.inventariosRepository.findOneBy({ id });
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return await this.inventariosRepository.update(id, updateInventarioDto);
  }

  async remove(id: number) {
    return await this.inventariosRepository.softDelete(id);
  }
}
