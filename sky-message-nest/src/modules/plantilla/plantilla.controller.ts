import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlantillaService } from './plantilla.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';

@Controller('plantilla')
export class PlantillaController {
  constructor(private readonly plantillaService: PlantillaService) {}

  @Post()
  create(@Body() createPlantillaDto: CreatePlantillaDto) {
    return this.plantillaService.create(createPlantillaDto);
  }

  @Get()
  findAll() {
    return this.plantillaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantillaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantillaDto: UpdatePlantillaDto) {
    return this.plantillaService.update(+id, updatePlantillaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantillaService.remove(+id);
  }
}
