import { Module } from '@nestjs/common';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destinatario } from './entities/destinatario.entity';
import { Envio } from './entities/envio.entity';
import { EstadoDestinatario } from './entities/estado-destinatario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Destinatario,
    Envio,
    EstadoDestinatario
  ])],
  exports: [EnvioService],
  controllers: [EnvioController],
  providers: [EnvioService],
})
export class EnvioModule {}
