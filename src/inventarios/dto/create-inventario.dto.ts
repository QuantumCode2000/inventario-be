import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateInventarioDto {
  @IsString()
  @MaxLength(100) // Máxima longitud para el nombre del item (ajustable)
  item: string;

  @IsString()
  @MaxLength(50) // Máxima longitud para el código (ajustable)
  codigo: string;

  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsString()
  @MaxLength(100) // Máxima longitud para la localización
  localizacion: string;

  @IsOptional()
  @IsString()
  @MaxLength(100) // Longitud opcional para la ubicación
  ubicacion?: string;
}
