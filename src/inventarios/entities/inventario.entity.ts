import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  codigoProducto: string; // Código único del producto

  @Column({ type: 'varchar', length: 100 })
  descripcion: string; // Descripción del producto

  @Column({ type: 'varchar', length: 50 })
  categoria: string; // Categoría del producto

  @Column({ type: 'varchar' })
  cantidadDisponible: string; // Cantidad disponible en inventario

  @Column({ type: 'varchar' })
  precioUnitario: string; // Precio unitario del producto

  @Column({ type: 'varchar', length: 20 })
  estado: string; // Estado del producto (disponible, agotado, etc.)

  @Column({ type: 'varchar', length: 100 })
  registradoPor: string; // Usuario que registró el producto

  @Column({ type: 'varchar', length: 50 })
  chofer: string; // Nombre del chofer del camión

  @Column({ type: 'varchar', length: 50 })
  camion: string; // Detalles del camión (placa, modelo, etc.)

  @Column({ type: 'varchar', length: 50 })
  nroNotaRemision: string; // Número de la nota de remisión

  @Column({ type: 'text' })
  detalle: string; // Detalles adicionales sobre el producto

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
