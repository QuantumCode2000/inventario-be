import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Salida {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único de la salida

  @Column({ nullable: false })
  item: string; // Nombre del ítem que se está retirando

  @Column({ nullable: false })
  codigo: string; // Código del ítem

  @Column('decimal', { precision: 10, scale: 2 })
  cantidad: number; // Cantidad de ítem que sale del inventario

  @Column({ nullable: true })
  observaciones: string; // Notas adicionales sobre la salida

  @Column({ nullable: false })
  sacadoPor: string; // Quién saca el ítem del inventario

  @Column({ nullable: true })
  motivo: string; // Motivo de la salida (prestado, vendido, transferido, etc.)

  @Column({ nullable: false })
  destino: string; // Para dónde se saca el producto (por ejemplo, nombre de la persona, cliente, departamento, etc.)

  @Column({ nullable: true })
  entregadoPor: string; // Quién entrega el ítem (opcional, si aplica en el flujo de salida)

  @Column({ nullable: true })
  unidadMedida: string; // Unidad de medida (ej. Litros, Kilos, Unidades)

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date; // Fecha de última actualización (automático)

  @DeleteDateColumn()
  deletedAt: Date; // Fecha de eliminación lógica (automático)

  @BeforeInsert()
  setDefaultCreatedAt() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
