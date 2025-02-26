import { Column } from "typeorm";

export class BaseModel {
  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deletedAt: Date;
}