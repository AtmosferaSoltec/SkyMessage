import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsuarioService,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.userService.findByUser(dto.user);
    if (usuario?.password !== dto.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { id: usuario.id, nombre: usuario.nombre };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      token_type: 'bearer',
      expires_in: 30,
    };
  }
}
