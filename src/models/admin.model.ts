import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";

@Entity('admins')
export class AdminModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'uid' })
  uid: string;

  @Column('varchar', { name: 'username' })
  username: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'name', nullable: true })
  name: string;
}