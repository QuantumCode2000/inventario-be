import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único del inventario

  @Column({ nullable: false })
  item: string; // Relación con la entidad (producto)

  @Column({ nullable: false })
  codigo: string; // Código único del item

  @Column('decimal', { precision: 10, scale: 2 })
  cantidad: number; // Cantidad en inventario, tipo decimal (permitiendo fracciones como 0.5 litros, 1.25 kg, etc.)

  @Column({ nullable: false })
  localizacion: string; // Localización principal (almacén, tienda, etc.)

  @Column({ nullable: true })
  ubicacion: string; // Detalles adicionales sobre la ubicación del producto dentro de la localización

  @CreateDateColumn()
  createdAt: Date; // Fecha de creación (automático)

  @UpdateDateColumn()
  updatedAt: Date; // Fecha de última actualización (automático)

  @DeleteDateColumn()
  deletedAt: Date; // Fecha de eliminación lógica (automático)
}
