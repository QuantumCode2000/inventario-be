import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único del item

  @Column({ length: 100 })
  nombre: string; // Nombre del item (máx. 100 caracteres)

  @Column({ type: 'text', nullable: true })
  descripcion: string; // Descripción detallada del item (opcional)

  @Column({ type: 'varchar', length: 50, unique: true })
  codigo: string; // Código único del item (máx. 50 caracteres)

  @Column({ length: 50 })
  categoria: string; // Categoría del item (máx. 50 caracteres)

  @Column({ length: 50 })
  unidadMedida: string; // Unidad de medida, por ejemplo, "kg", "litros"

  @Column({ type: 'text', nullable: true })
  observaciones: string; // Notas u observaciones opcionales

  @CreateDateColumn()
  createdAt: Date; // Fecha de creación (automático)

  @UpdateDateColumn()
  updatedAt: Date; // Fecha de última actualización (automático)

  @DeleteDateColumn()
  deletedAt: Date; // Fecha de eliminación lógica (automático)
}
