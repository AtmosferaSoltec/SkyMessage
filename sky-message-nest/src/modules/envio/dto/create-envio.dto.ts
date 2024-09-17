import { Type } from "class-transformer";
import { IsArray, ValidateNested, IsString, IsNotEmpty } from "class-validator";

export class CreateEnvioDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDestinatarioDto)
    destinatarios: CreateDestinatarioDto[];
  
    @IsString()
    @IsNotEmpty()
    mensaje: string;
  }
  
  export class CreateDestinatarioDto {
    @IsString({ message: 'El mensaje debe ser un texto' })
    nombre: string;
  
    @IsString()
    telf: string;
  }
  