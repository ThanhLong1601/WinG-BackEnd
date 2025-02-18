import { Column } from "typeorm";

export class BaseModel {
  @Column('varchar', { name: 'created_at' })
  createdAt: string;

  @Column('varchar', { name: 'updated_at' })
  updatedAt: string;
}