import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EnvioService } from './envio.service';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

@Controller('envio')
export class EnvioController {
  constructor(private readonly envioService: EnvioService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() request: Request, @Body() dto: CreateEnvioDto) {
    const { id } = request['user'];
    return this.envioService.create(dto, id);
  }

  @Get()
  findAll() {
    return this.envioService.findAll();
  }

  @Get('historial')
  findAllHistorial() {
    return this.envioService.findAllHistorial();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.envioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnvioDto: UpdateEnvioDto) {
    return this.envioService.update(+id, updateEnvioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.envioService.remove(+id);
  }
}
