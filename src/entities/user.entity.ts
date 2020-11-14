import { IsEmail, MaxLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsEmail()
  @MaxLength(255)
  @Column()
  email!: string;

  @Column()
  password_digest!: string;

  @Column()
  hero_id!: number;
}
