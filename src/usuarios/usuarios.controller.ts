// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { UsuariosService } from './usuarios.service';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';
// import { UpdateUsuarioDto } from './dto/update-usuario.dto';

// @Controller('usuarios')
// export class UsuariosController {
//   constructor(private readonly usuariosService: UsuariosService) {}

//   @Post()
//   create(@Body() createUsuarioDto: CreateUsuarioDto) {
//     return this.usuariosService.create(createUsuarioDto);
//   }

//   @Get()
//   findAll() {
//     return this.usuariosService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.usuariosService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
//     return this.usuariosService.update(+id, updateUsuarioDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.usuariosService.remove(+id);
//   }
// }
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
// import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'; // Importa el Guard

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // @UseGuards(JwtAuthGuard) // Aplica el Guard para esta ruta
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  // @UseGuards(JwtAuthGuard) // Aplica el Guard para esta ruta
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  // @UseGuards(JwtAuthGuard) // Aplica el Guard para esta ruta
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard) // Aplica el Guard para esta ruta
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  // @UseGuards(JwtAuthGuard) // Aplica el Guard para esta ruta
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
