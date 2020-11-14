import { IsEmail, MaxLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
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
