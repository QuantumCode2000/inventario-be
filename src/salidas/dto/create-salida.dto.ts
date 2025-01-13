import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
} from 'class-validator';

// DTO para la creación de una salida en el inventario
export class CreateSalidaDto {
  @IsString()
  @IsNotEmpty()
  item: string; // Nombre del ítem que se está retirando

  @IsString()
  @IsNotEmpty()
  codigo: string; // Código del ítem

  @IsNumber()
  @Min(0) // La cantidad no puede ser negativa
  cantidad: number; // Cantidad de ítem que sale del inventario

  @IsOptional()
  @IsString()
  observaciones?: string; // Notas adicionales sobre la salida

  @IsString()
  @IsNotEmpty()
  sacadoPor: string; // Quién saca el ítem del inventario

  @IsString()
  @IsNotEmpty()
  motivo: string; // Motivo de la salida (por ejemplo, préstamo, venta, etc.)

  @IsString()
  @IsNotEmpty()
  destino: string; // Para dónde se saca el producto (por ejemplo, cliente, departamento, etc.)

  @IsOptional()
  @IsString()
  unidadMedida?: string; // Unidad de medida del producto (Ej: Litros, Kilogramos)

  @IsOptional()
  @IsString()
  entregadoPor?: string; // Quién entrega el ítem (opcional, si aplica en el flujo de salida)
}
