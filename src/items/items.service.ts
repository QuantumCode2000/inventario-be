// import {
//   Injectable,
//   ConflictException,
//   NotFoundException,
//   OnModuleInit,
// } from '@nestjs/common';
// import { CreateItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Item } from './entities/item.entity'; // La entidad que representa la tabla `items` en la base de datos.

// @Injectable()
// export class ItemsService implements OnModuleInit {
//   constructor(
//     @InjectRepository(Item)
//     private itemsRepository: Repository<Item>, // Repositorio para interactuar con la tabla `items`
//   ) {}

//   // Crear un item predeterminado al inicializar el módulo
//   async onModuleInit() {
//     const defaultItemCode = 'DEFAULT001';

//     // Verificar si el item predeterminado ya existe
//     const existingItem = await this.itemsRepository.findOne({
//       where: { codigo: defaultItemCode },
//     });

//     if (!existingItem) {
//       // Crear un item predeterminado
//       const defaultItem: CreateItemDto = {
//         nombre: 'Producto Predeterminado',
//         descripcion:
//           'Este es el producto predeterminado creado al inicializar el módulo.',
//         codigo: defaultItemCode,
//         categoria: 'General',
//         observaciones: 'Item inicial para pruebas o configuración.',
//         unidadMedida: 'Unidad',
//       };

//       await this.create(defaultItem); // Usar el método de creación ya definido
//     }
//   }

//   // Crear un nuevo item
//   async create(createItemDto: CreateItemDto) {
//     const { codigo } = createItemDto;

//     // Verificar si el código ya existe
//     const existingItem = await this.itemsRepository.findOne({
//       where: { codigo },
//     });

//     if (existingItem) {
//       throw new ConflictException({
//         message: 'El código del item ya existe.',
//         error: 'Conflict',
//       });
//     }

//     const item = this.itemsRepository.create(createItemDto);
//     return await this.itemsRepository.save(item);
//   }

//   // Obtener todos los items
//   async findAll() {
//     return await this.itemsRepository.find();
//   }

//   // Obtener un item por ID
//   async findOne(id: number) {
//     const item = await this.itemsRepository.findOneBy({ id });
//     if (!item) {
//       throw new NotFoundException(`Item con ID ${id} no encontrado.`);
//     }
//     return item;
//   }

//   // Actualizar un item por ID
//   async update(id: number, updateItemDto: UpdateItemDto) {
//     const item = await this.findOne(id); // Asegurarse de que el item existe
//     Object.assign(item, updateItemDto); // Asignar los nuevos valores
//     return await this.itemsRepository.save(item);
//   }

//   // Eliminar un item de forma lógica
//   async remove(id: number) {
//     const item = await this.findOne(id); // Asegurarse de que el item existe
//     return await this.itemsRepository.softDelete(item.id); // Eliminación lógica
//   }
// }

import {
  Injectable,
  ConflictException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InventariosService } from '../inventarios/inventarios.service';
import { CreateInventarioDto } from '../inventarios/dto/create-inventario.dto';

@Injectable()
export class ItemsService implements OnModuleInit {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private inventariosService: InventariosService, // Inyectar el servicio de inventarios
  ) {}

  async onModuleInit() {
    const defaultItemCode = 'DEFAULT001';
    const existingItem = await this.itemsRepository.findOne({
      where: { codigo: defaultItemCode },
    });

    if (!existingItem) {
      const defaultItem: CreateItemDto = {
        nombre: 'Producto Predeterminado',
        descripcion:
          'Este es el producto predeterminado creado al inicializar el módulo.',
        codigo: defaultItemCode,
        categoria: 'General',
        observaciones: 'Item inicial para pruebas o configuración.',
        cantidad: 0,
        unidadMedida: 'Unidad',
      };
      await this.create(defaultItem);
    }
  }

  // Crear un nuevo item y registrar su inventario
  async create(createItemDto: CreateItemDto) {
    const { codigo, nombre, unidadMedida, cantidad, descripcion } =
      createItemDto;

    const existingItem = await this.itemsRepository.findOne({
      where: { codigo },
    });

    if (existingItem) {
      throw new ConflictException({
        message: 'El código del item ya existe.',
        error: 'Conflict',
      });
    }

    const item = this.itemsRepository.create(createItemDto);
    const savedItem = await this.itemsRepository.save(item);

    // Crear un inventario asociado al nuevo item
    const inventarioDto: CreateInventarioDto = {
      item: nombre,
      codigo: codigo,
      cantidad: cantidad, // Cantidad inicial en el inventario
      unidadMedida: unidadMedida,
      descripcion: descripcion,
      localizacion: 'Almacén',
      ubicacion: 'Estante',
    };

    await this.inventariosService.create(inventarioDto);

    return savedItem;
  }

  async findAll() {
    return await this.itemsRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item con ID ${id} no encontrado.`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    Object.assign(item, updateItemDto);
    return await this.itemsRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return await this.itemsRepository.softDelete(item.id);
  }
}
