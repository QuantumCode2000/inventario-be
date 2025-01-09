import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, // Aseguramos que las rutas estén protegidas
} from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'; // Importa el Guard

@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Aseguramos que solo usuarios con token válido puedan crear
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventariosService.create(createInventarioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Aseguramos que solo usuarios con token válido puedan ver todos los inventarios
  findAll() {
    return this.inventariosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Aseguramos que solo usuarios con token válido puedan ver un inventario específico
  findOne(@Param('id') id: string) {
    return this.inventariosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Aseguramos que solo usuarios con token válido puedan actualizar
  update(
    @Param('id') id: string,
    @Body() updateInventarioDto: UpdateInventarioDto,
  ) {
    return this.inventariosService.update(+id, updateInventarioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Aseguramos que solo usuarios con token válido puedan eliminar
  remove(@Param('id') id: string) {
    return this.inventariosService.remove(+id);
  }
}
