import { Injectable, OnModuleInit } from '@nestjs/common'; // Importa OnModuleInit
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService implements OnModuleInit {
  // Implementa OnModuleInit
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async onModuleInit() {
    // Verifica si ya existe un usuario admin, para no crear uno cada vez que se inicia la aplicación
    const adminExists = await this.usuariosRepository.findOneBy({
      rol: 'administrador',
    });

    if (!adminExists) {
      // Si no existe, crea un nuevo usuario administrador
      const defaultAdmin: CreateUsuarioDto = {
        ci: '1234567890', // Puedes cambiar estos valores por algo más seguro o dinámico
        extension: '0001',
        nombre: 'Administrador',
        apellidoPaterno: 'Admin',
        apellidoMaterno: 'Admin',
        email: 'admin@dominio.com',
        password: 'admin123', // Asegúrate de cambiarlo a un valor seguro
        cargo: 'Jefe de Almacén',
        rol: 'administrador',
        estado: 'activo',
      };

      // Crea y guarda el usuario administrador
      await this.create(defaultAdmin);
    }
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return await this.usuariosRepository.save(usuario);
  }

  async findAll() {
    return await this.usuariosRepository.find();
  }

  async findOne(id: number) {
    return await this.usuariosRepository.findOneBy({ id });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { ...rest } = updateUsuarioDto as UpdateUsuarioDto;

    if (rest.password) {
      rest.password = await bcrypt.hash(rest.password, 10);
    }

    await this.usuariosRepository.update(id, rest);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.usuariosRepository.softDelete(id);
  }

  async findOneByEmail(email: string) {
    return await this.usuariosRepository.findOneBy({
      email,
    });
  }
}
