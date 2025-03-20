import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ArtJournal } from "./art_journal.model";
import { UserModel } from "./user.model";
import { BaseModel } from "./base.model";

@Entity('user_submis_art')
export class UserSubmisArtModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'uaid' })
  uaid: string;

  @Column('varchar', { name: 'aid' })
  aid: string;

  @Column('varchar', { name: 'uid' })
  uid: string;

  @Column('timestamp', { name: 'submission_date', nullable: true })
  submissionDate: Date;

  @Column('int', { name: 'pointsEarned', default: 0 })
  pointsEarned: number;

  // original drawing data
  @Column('varchar', { name: 'canvas' })
  canvas: string;

  // output image
  @Column('varchar', { name: 'submitted_artwork' })
  submittedArtWork: string;

  // Written thoughts by user for this artwork
  @Column('text', { name: 'user_thoughts', nullable: true })
  userThoughts: string;

  @Column('varchar', { name: 'status', default: 'uncomplete' })
  status: string;

  @ManyToOne(() => ArtJournal, artJournal => artJournal.userSubmisArts)
  @JoinColumn({ name: 'aid'})
  artJournal: ArtJournal;

  @ManyToOne(() => UserModel, user => user.userSubmisArts)
  @JoinColumn({ name: 'uid'})
  user: UserModel;
}