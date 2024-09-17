import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    throw new InternalServerErrorException('Error al guardar los mensajes');
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const usuario = await this.repo.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async findByUser(user: string) {
    const usuario = await this.repo.findOne({ where: { user } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    throw new NotFoundException('Usuario no encontrado');
  }

  remove(id: number) {
    throw new HttpException('Prueba', HttpStatus.BAD_REQUEST);
  }
}
