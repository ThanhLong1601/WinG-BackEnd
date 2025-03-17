import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";
import { ContentModel } from "./content.model";
import { UserModel } from "./user.model";

@Entity('user_content')
export class UserContentModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'ucid' })
  ucid: string;

  @Column('varchar', { name: 'conid' })
  conid: string;

  @Column('varchar', { name: 'uid' })
  uid: string;

  @ManyToOne(() => ContentModel, (content) => content.userContents)
  @JoinColumn({ name: 'conid' })
  content: ContentModel;

  @ManyToOne(() => UserModel, (user) => user.userContents)
  @JoinColumn({ name: 'uid' })
  user: UserModel;
}