import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";
import { ContentModel } from "./content.model";

@Entity('user_view_content')
export class UserViewContentModel extends BaseModel {
  @PrimaryColumn('uuid', { name: 'uid' })
  uid: string;

  @PrimaryColumn('uuid', { name: 'conid' })
  conid: string;

  @Column('int', { name: 'views', default: 1 })
  views: number;

  @ManyToOne(() => UserModel, user => user.userViewContents)
  @JoinColumn({ name: 'uid' })
  user: UserModel;

  @ManyToOne(() => ContentModel, content => content.userViewContents)
  @JoinColumn({ name: 'conid' })
  content: ContentModel;

}