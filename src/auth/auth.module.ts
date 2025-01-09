// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UsuariosModule } from 'src/usuarios/usuarios.module';
// import { JwtModule } from '@nestjs/jwt';

// const jwtConstants = {
//   secret: 'no se lo digas a nadie',
// };

// @Module({
//   imports: [UsuariosModule,
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '1d' },
//       global: true
//     })
//   ],
//   controllers: [AuthController],
//   providers: [AuthService]
// })
// export class AuthModule { }
// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UsuariosModule } from 'src/usuarios/usuarios.module';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     UsuariosModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET', 'defaultSecret'),
//         signOptions: { expiresIn: '1d' },
//       }),
//     }),
//     ConfigModule.forRoot(), // Asegúrate de tener la configuración de variables de entorno
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const jwtConstants = {
  secret: 'no se lo digas a nadie',
};

@Module({
  imports: [
    UsuariosModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registra Passport con la estrategia por defecto
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Agrega JwtStrategy aquí
  exports: [AuthService], // Exporta AuthService si es necesario en otros módulos
})
export class AuthModule {}
