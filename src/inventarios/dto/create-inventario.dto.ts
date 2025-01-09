import { IsString, Length } from 'class-validator';

export class CreateInventarioDto {
  @IsString()
  @Length(1, 50)
  codigoProducto: string; // Código único del producto

  @IsString()
  @Length(1, 100)
  descripcion: string; // Descripción del producto

  @IsString()
  @Length(1, 50)
  categoria: string; // Categoría del producto

  @IsString()
  @Length(1, 50)
  cantidadDisponible: string; // Cantidad disponible en inventario

  @IsString()
  @Length(1, 50)
  precioUnitario: string; // Precio unitario del producto

  @IsString()
  @Length(1, 20)
  estado: string; // Estado del producto (disponible, agotado, etc.)

  @IsString()
  @Length(1, 100)
  registradoPor: string; // Usuario que registró el producto

  @IsString()
  @Length(1, 50)
  chofer: string; // Nombre del chofer del camión

  @IsString()
  @Length(1, 50)
  camion: string; // Detalles del camión (placa, modelo, etc.)

  @IsString()
  @Length(1, 50)
  nroNotaRemision: string; // Número de la nota de remisión

  @IsString()
  @Length(1, 500)
  detalle: string; // Detalles adicionales sobre el producto
}
