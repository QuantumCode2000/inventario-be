import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del encabezado Authorization
      ignoreExpiration: false, // Verifica la expiración del token
      secretOrKey: 'no se lo digas a nadie', // Usa el mismo secreto que configuraste en JwtModule
    });
  }

  // Este método valida el token y extrae el payload
  async validate(payload: any) {
    return {
      email: payload.email,
      rol: payload.rol,
      nombre: payload.nombre,
    }; // Puedes agregar más datos si es necesario
  }
}
