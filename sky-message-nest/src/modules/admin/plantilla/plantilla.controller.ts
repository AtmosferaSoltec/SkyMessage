import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, Put, UseGuards, Req } from '@nestjs/common';
import { PlantillaService } from './plantilla.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('plantilla')
export class PlantillaController {
  constructor(private readonly plantillaService: PlantillaService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  create(@Body() dto: CreatePlantillaDto) {
    return this.plantillaService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    return this.plantillaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new ConflictException('El id debe ser un número');
    }
    return this.plantillaService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlantillaDto) {
    if (isNaN(+id)) {
      throw new ConflictException('El id debe ser un número');
    }
    return this.plantillaService.update(+id, dto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new ConflictException('El id debe ser un número');
    }
    return this.plantillaService.remove(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put(':id')
  restore(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new ConflictException('El id debe ser un número');
    }
    return this.plantillaService.restore(+id);
  }
}
