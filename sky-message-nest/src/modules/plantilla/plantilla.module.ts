import { Module } from '@nestjs/common';
import { PlantillaService } from './plantilla.service';
import { PlantillaController } from './plantilla.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plantilla])],
  controllers: [PlantillaController],
  providers: [PlantillaService],
})
export class PlantillaModule {}
