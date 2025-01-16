// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
//   DeleteDateColumn,
// } from 'typeorm';

// export enum TipoEntrada {
//   ABASTECE = 'abastecimiento', // Entrada para abastecer el almacén
//   DEVUELVE = 'devolución', // Entrada por devolución de préstamo
// }

// @Entity()
// export class Entrada {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: false })
//   item: string; // Nombre del item (producto)

//   @Column({ nullable: false })
//   codigo: string; // Código del item

//   @Column('decimal', { precision: 10, scale: 2 })
//   cantidad: number; // Cantidad agregada al inventario

//   @Column({ nullable: true })
//   observaciones: string; // Notas adicionales sobre la entrada

//   @Column({ nullable: true })
//   registradoPor: string; // Nombre o ID del usuario que registra la entrada

//   @Column({ nullable: true })
//   entregadoPor: string; // Nombre o ID del usuario que entrega la entrada

//   // Detalles de quien abastece
//   @Column({ nullable: true })
//   abastecidoPor: string; // Nombre o ID de la entidad/proveedor que abastece

//   @Column({ nullable: true })
//   vehiculoEntrega: string; // Información sobre el vehículo de entrega

//   @Column({ nullable: true })
//   chofer: string; // Nombre o ID del chofer

//   // Detalles de quien recibe
//   @Column({ nullable: true })
//   recibidoPor: string; // Nombre o ID de la persona/entidad que recibe el producto

//   @Column({ nullable: true })
//   nroRemision: string; // Número de remisión (nota de remisión)

//   @Column({ nullable: false })
//   motivo: string; // Motivo de la entrada (compra, devolución, transferencia, etc.)

//   @Column({ nullable: true })
//   unidadMedida: string; // Unidad de medida (ej. Litros, Kilos, Unidades)

//   @Column({
//     type: 'enum',
//     enum: TipoEntrada,
//   })
//   tipoEntrada: TipoEntrada; // Tipo de entrada: 'abastecimiento' o 'devolución'

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;
// }

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';

export enum TipoEntrada {
  ABASTECE = 'abastecimiento',
  DEVUELVE = 'devolución',
}

@Entity()
export class Entrada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  item: string;

  @Column({ nullable: false })
  codigo: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cantidad: number;

  @Column({ nullable: true })
  observaciones: string;

  @Column({ nullable: true })
  registradoPor: string;

  @Column({ nullable: true })
  entregadoPor: string;

  @Column({ nullable: true })
  abastecidoPor: string;

  @Column({ nullable: true })
  vehiculoEntrega: string;

  @Column({ nullable: true })
  chofer: string;

  @Column({ nullable: true })
  recibidoPor: string;

  @Column({ nullable: true })
  nroRemision: string;

  @Column({ nullable: false })
  motivo: string;

  @Column({ nullable: true })
  unidadMedida: string;

  @Column({
    type: 'enum',
    enum: TipoEntrada,
  })
  tipoEntrada: TipoEntrada;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  setDefaultCreatedAt() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
