import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";
import { ContentModel } from "./content.model";

@Entity('category_content')
export class CategoryContentModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'cateid' })
  cateid: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'status', default: 'active' })
  status: string;

  @OneToMany(() => ContentModel, (content) => content.category)
  contents: ContentModel[];
}