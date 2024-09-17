import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { Repository } from 'typeorm';
import { Plantilla } from './entities/plantilla.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlantillaService {
  constructor(
    @InjectRepository(Plantilla)
    private readonly repo: Repository<Plantilla>,
  ) {}

  async create(createPlantillaDto: CreatePlantillaDto) {
    const { titulo } = createPlantillaDto;
    await this.isTituloExist(titulo);
    const plantilla = this.repo.create(createPlantillaDto);
    await this.repo.save(plantilla);
    return plantilla;
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const plantilla = await this.repo.findOne({ where: { id } });
    if (!plantilla) {
      throw new NotFoundException(`Plantilla #${id} no encontrada`);
    }
    return plantilla;
  }

  async isTituloExist(titulo: string) {
    const isTituloExist = await this.repo.findOne({ where: { titulo } });
    if (isTituloExist) {
      throw new ConflictException(`Plantilla con titulo ${titulo} ya existe`);
    }
  }

  async update(id: number, updatePlantillaDto: UpdatePlantillaDto) {
    await this.findOne(id);
    await this.isTituloExist(updatePlantillaDto.titulo);
    const update = await this.repo.preload({ id, ...updatePlantillaDto });
    await this.repo.save(update);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const plantilla = await this.findOne(id);
    await this.repo.remove(plantilla);
    return;
  }
}
