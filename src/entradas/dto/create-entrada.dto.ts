import {
  IsString,
  IsNumber,  IsOptional,
  IsNotEmpty,
  IsEnum,
  Min,
  ValidateIf,
} from 'class-validator';
// Importación de decoradores para validación de clases
import { TipoEntrada } from '../entities/entrada.entity'; // Importación del tipo de entrada (Enum)

// DTO para la creación de una entrada en el inventario
export class CreateEntradaDto {
  @IsString()
  @IsNotEmpty()
  item: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsNumber()
  @Min(0) // La cantidad no puede ser negativa
  cantidad: number;

  @IsOptional()
  @IsString()
  observaciones?: string;

  // Solo para tipo "devolución"
  @ValidateIf((o) => o.tipoEntrada === TipoEntrada.DEVUELVE) // Solo se valida si el tipoEntrada es "DEVUELVE"
  @IsString()
  @IsOptional()
  recibidoPor?: string; // Campo opcional para indicar quién recibe la entrada

  @ValidateIf((o) => o.tipoEntrada === TipoEntrada.DEVUELVE) // Solo se valida si el tipoEntrada es "DEVUELVE"
  @IsString()
  @IsOptional()
  entregadoPor?: string; // Campo opcional para indicar quién entrega el ítem en caso de devolución

  // Solo para tipo "abastecimiento"
  @ValidateIf((o) => o.tipoEntrada === TipoEntrada.ABASTECE) // Solo se valida si el tipoEntrada es "ABASTECE"
  @IsString()
  @IsOptional()
  abastecidoPor?: string; // Campo opcional para indicar quién abastece el inventario

  @ValidateIf((o) => o.tipoEntrada === TipoEntrada.ABASTECE) // Solo se valida si el tipoEntrada es "ABASTECE"
  @IsString()
  @IsOptional()
  registradoPor?: string; // Campo opcional para indicar quién registra la entrada en el sistema

  @IsOptional()
  @IsString()
  vehiculoEntrega?: string; // Información del vehículo usado para la entrega

  @IsOptional()
  @IsString()
  chofer?: string; // Información del chofer del vehículo de entrega

  @IsOptional()
  @IsString()
  nroRemision?: string; // Número de la nota de remisión para la entrega

  @IsString()
  @IsNotEmpty()
  motivo: string; // Motivo de la entrada (compra, devolución, transferencia, etc.)

  @IsOptional()
  @IsString()
  unidadMedida?: string; // Unidad de medida del producto (Ej: Litros, Kilogramos)

  @IsEnum(TipoEntrada) // Asegura que el valor de tipoEntrada sea uno de los valores del enum TipoEntrada
  tipoEntrada: TipoEntrada; // Tipo de entrada: "abastecimiento" o "devolución"
}
