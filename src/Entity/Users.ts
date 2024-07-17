import { Column, Entity, Index, OneToMany } from "typeorm";
import { Consulta } from "./Consulta";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "TYPE-ORM-E-DOCKER-SQL" })
export class Users {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "password", nullable: true, length: 100 })
  password: string | null;

  @Column("varchar", { name: "created_at", nullable: true, length: 24 })
  createdAt: string | null;

  @OneToMany(() => Consulta, (consulta) => consulta.user)
  consultas: Consulta[];

  constructor(
    id: string,
    name: string | null,
    password: string | null,
    createdAt: string | null,
    consultas: Consulta[],
    email: string,
) {
  this.id = id
  this.name = name
  this.email = email
  this.password = password
  this.createdAt = createdAt
  this.consultas = consultas
}  
}
