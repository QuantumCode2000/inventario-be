import { Module } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { EntradasController } from './entradas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrada } from './entities/entrada.entity';
import { Inventario } from '../inventarios/entities/inventario.entity';
import { InventariosModule } from '../inventarios/inventarios.module';
@Module({
  imports: [TypeOrmModule.forFeature([Entrada, Inventario]), InventariosModule],
  controllers: [EntradasController],
  providers: [EntradasService],
})
export class EntradasModule {}
