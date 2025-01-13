import { Module } from '@nestjs/common';
import { SalidasService } from './salidas.service';
import { SalidasController } from './salidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salida } from './entities/salida.entity';
import { Inventario } from '../inventarios/entities/inventario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salida, Inventario])],
  controllers: [SalidasController],
  providers: [SalidasService],
})
export class SalidasModule {}
