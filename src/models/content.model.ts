import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";
import { CategoryContentModel } from "./category_content.model";
import { UserViewContentModel } from "./user_view_content.model";
import { UserContentModel } from "./user_content.model";

@Entity('contents')
export class ContentModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'conid' })
  conid: string;

  @Column('varchar', { name: 'type' })
  type: string;

  @Column('int', { name: 'required_months', nullable: true })
  requiredMonths: number;

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

  @Column('json', { name: 'images', nullable: true })
  images: string[];

  @Column('varchar', { name: 'status', default: 'active' })
  status: string;

  @ManyToOne(() => CategoryContentModel, (category) => category.contents)
  @JoinColumn({ name: 'category_id' })
  category: CategoryContentModel;

  @OneToMany(() => UserViewContentModel, (userViewContent) => userViewContent.content)
  userViewContents: UserViewContentModel[];

  getViewCount(): number {
    if (!this.userViewContents) {
      return 0;
    }

    return this.userViewContents.reduce((totalViews, userViewContent) => totalViews + userViewContent.views, 0);
  }

  @OneToMany(() => UserContentModel, (userContent) => userContent.content)
  userContents: UserContentModel[];
}