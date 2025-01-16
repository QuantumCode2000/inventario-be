import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';

@Injectable()
export class InventariosService {
  constructor(
    @InjectRepository(Inventario)
    private inventariosRepository: Repository<Inventario>,
  ) {}

  // Método que se ejecuta al iniciar el módulo
  // async onModuleInit() {
  //   // Verifica si ya existe un inventario predeterminado
  //   const inventarioExists = await this.inventariosRepository.findOneBy({
  //     codigo: 'DEFAULT001', // Código único para el inventario predeterminado
  //   });

  //   if (!inventarioExists) {
  //     // Si no existe, crea un inventario predeterminado
  //     const defaultInventario: CreateInventarioDto = {
  //       item: 'Producto Predeterminado',
  //       codigo: 'DEFAULT001',
  //       cantidad: 100,
  //       localizacion: 'Almacén Central',
  //       unidadMedida: 'Unidad',
  //       ubicacion: 'Estante A1',
  //     };

  //     await this.create(defaultInventario);
  //   }
  // }

  // Crear un nuevo inventario
  async create(createInventarioDto: CreateInventarioDto) {
    const { codigo } = createInventarioDto;

    // Verificar si ya existe un producto con el mismo código
    const existingProducto = await this.inventariosRepository.findOne({
      where: { codigo },
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

  // Obtener todos los inventarios
  async findAll() {
    return await this.inventariosRepository.find();
  }

  // Obtener un inventario por ID
  async findOne(id: number) {
    const inventario = await this.inventariosRepository.findOneBy({ id });
    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado.`);
    }
    return inventario;
  }

  // Actualizar un inventario por ID
  async update(id: number, updateInventarioDto: UpdateInventarioDto) {
    const inventario = await this.findOne(id); // Asegurarse de que el inventario existe
    Object.assign(inventario, updateInventarioDto);
    return await this.inventariosRepository.save(inventario);
  }

  // Eliminar un inventario de forma lógica
  async remove(id: number) {
    const inventario = await this.findOne(id); // Asegurarse de que el inventario existe
    return await this.inventariosRepository.softDelete(inventario.id);
  }
}
