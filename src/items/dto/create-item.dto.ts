import { IsString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre: string; // Nombre del item, obligatorio, max 100 caracteres

  @IsString()
  @IsOptional()
  @Length(0, 500)
  descripcion?: string; // Descripción opcional, max 500 caracteres

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  codigo: string; // Código único del item, obligatorio, max 50 caracteres

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  categoria: string; // Categoría del item, obligatorio, max 50 caracteres

  @IsOptional()
  @IsString()
  @Length(0, 500)
  observaciones?: string; // Observaciones opcionales, max 500 caracteres

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  unidadMedida: string; // Unidad de medida, obligatorio, max 50 caracteres
}
