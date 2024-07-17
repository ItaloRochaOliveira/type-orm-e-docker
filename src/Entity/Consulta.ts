import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("user_id", ["userId"], {})
@Entity("consulta", { schema: "TYPE-ORM-E-DOCKER-SQL" })
export class Consulta {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 200 })
  description: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 100 })
  status: string | null;

  @Column("varchar", { name: "data", nullable: true, length: 24 })
  data: string | null;

  @Column("varchar", { name: "created_at", nullable: true, length: 24 })
  createdAt: string | null;

  @Column("varchar", { name: "updated_at", nullable: true, length: 24 })
  updatedAt: string | null;

  @Column("varchar", { name: "user_id", length: 36 })
  userId: string;

  @ManyToOne(() => Users, (users) => users.consultas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  constructor(
    id: string,
    name: string | null,
    description: string | null,
    status: string | null,
    data: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    userId: string,
    user: Users
) {
  this.id = id
  this.name = name
  this.description = description
  this.status = status
  this.data = data
  this.createdAt = createdAt
  this.updatedAt = updatedAt
  this.userId = userId
  this.user = user
}  
}
