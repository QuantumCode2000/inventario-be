import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

// Enum para el rol
export enum RolEnum {
  ADMIN = 'administrador',
  USER = 'usuario',

}

// Enum para el estado
export enum EstadoEnum {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  ci: string;

  @Column({ type: 'varchar', length: 5 })
  extension: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellidoPaterno: string;

  @Column({ type: 'varchar', length: 100 })
  apellidoMaterno: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: RolEnum })
  rol: RolEnum;

  @Column({ type: 'enum', enum: EstadoEnum })
  estado: EstadoEnum;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
