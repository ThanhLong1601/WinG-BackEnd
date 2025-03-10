import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";
import { CategoryContentModel } from "./category_content.model";

@Entity('contents')
export class ContentModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'conid' })
  conid: string;

  @Column('varchar', { name: 'type_of_content' })
  typeOfContent: string;

  @Column('int', { name: 'required_days', nullable: true })
  requiredDays: number;

  @Column('varchar', { name: 'banner', nullable: true })
  banner: string;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('varchar', { name: 'category_id' })
  categoryId: string;

  // content(article), description(video), content(infographic).
  @Column('text', { name: 'content', nullable: true })
  content: string;

  @Column('varchar', { name: 'video', nullable: true })
  video: string;

  @Column('varchar', { name: 'images', nullable: true })
  images: string;

  @Column('varchar', { name: 'status', default: 'active' })
  status: string;

  @ManyToOne(() => CategoryContentModel, (category) => category.contents)
  @JoinColumn({ name: 'category_id' })
  category: CategoryContentModel;
}