import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ItemsModule } from './items/items.module';
import { SalidasModule } from './salidas/salidas.module';
import { EntradasModule } from './entradas/entradas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuariosModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    InventariosModule,
    PedidosModule,
    ItemsModule,
    SalidasModule,
    EntradasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
