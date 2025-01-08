import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Correo inválido');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña inválida');
    }

    // Generamos el payload del JWT
    const payload = {
      email: user.email,
      rol: user.rol,
      nombre: `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
    };

    // Firmamos el JWT
    const token = await this.jwtService.signAsync(payload);

    return {
      email: user.email,
      rol: user.rol,
      token, // Retornamos el JWT
      nombre: `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
    };
  }
}
