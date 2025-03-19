import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserSubmisArtModel } from "./user_submis_art.model";
import { BaseModel } from "./base.model";

@Entity('art_journal')
export class ArtJournal extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'aid' })
  aid: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'status', default: 'active' })
  status: string;

  @Column('int', { name: 'point', default: 0 })
  point: number;

  @Column('boolean', { name: 'is_draw_circle', nullable: true })
  isDrawCircle: boolean;

  @Column('varchar', { name: 'description', nullable: true })
  description: string;

  @Column('varchar', { name: 'banner', nullable: true })
  banner: string;

  @OneToMany(() => UserSubmisArtModel, userSubmisArt => userSubmisArt.artJournal)
  userSubmisArts: UserSubmisArtModel[];

  getTotalSubmissions(): number {
    if (!this.userSubmisArts) {
      return 0;
    }
    return this.userSubmisArts.filter(submission => submission.status === 'complete').length;
  }
  
  getTotalSubmissionsThisWeek(): number {
    if (!this.userSubmisArts) {
      return 0;
    }

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    return this.userSubmisArts.filter(submission => 
      submission.status === 'complete' &&
      submission.submissionDate >= startOfWeek &&
      submission.submissionDate <= currentDate
    ).length;
  }
}
