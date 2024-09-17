import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Envio } from './entities/envio.entity';
import { Repository } from 'typeorm';
import { Destinatario } from './entities/destinatario.entity';
import { EstadoDestinatario } from './entities/estado-destinatario.entity';

@Injectable()
export class EnvioService {
  constructor(
    @InjectRepository(Envio)
    private readonly repo: Repository<Envio>,

    @InjectRepository(Destinatario)
    private readonly repoDestinatario: Repository<Destinatario>,

    @InjectRepository(EstadoDestinatario)
    private readonly repoEstado: Repository<EstadoDestinatario>,
  ) {}

  async create(dto: CreateEnvioDto) {
    try {
      const envio = new Envio();
      envio.mensaje = dto.mensaje;

      const pendiente = await this.repoEstado.findOne({
        where: { nombre: 'Pendiente' },
      });

      envio.destinatarios = dto.destinatarios.map((destDto) => {
        const destinatario = new Destinatario();
        destinatario.nombre = destDto.nombre;
        destinatario.telf = destDto.telf;
        destinatario.estado = pendiente;
        destinatario.envio = envio;
        destinatario.id = 0;
        return destinatario;
      });

      const savedEnvio = await this.repo.save(envio);

      return this.findOne(savedEnvio.id);
    } catch (error) {
      console.log(error?.message);
      throw new InternalServerErrorException('Error al guardar el envio');
    }
  }

  async findAll() {
    try {
      const list = await this.repo.find();
      return list.map((envio) => ({
        id: envio.id,
        correlativo: envio.correlativo,
        mensaje: envio.mensaje,
        created_at: envio.created_at,
        destinatarios: envio.destinatarios
          .filter((dest) => dest.estado.nombre == 'Pendiente')
          .map((destinatario) => ({
            nombre: destinatario.nombre,
            telf: destinatario.telf,
            estado: destinatario.estado.nombre,
          })),
      }));
    } catch (error) {
      throw new Error(`Error al obtener envíos: ${error.message}`);
    }
  }

  async findOne(id: number) {
    const envio = await this.repo.findOne({ where: { id } });
    return envio;
  }

  async update(id: number, updateEnvioDto: UpdateEnvioDto) {
    return `This action updates a #${id} envio`;
  }

  async remove(id: number) {
    return `This action removes a #${id} envio`;
  }
}
