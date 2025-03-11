import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";
import { UserViewContentModel } from "./user_view_content.model";

@Entity('users')
export class UserModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'uid' })
  uid: string;

  @Column('varchar', { name: 'phone' })
  phone: string;

  @Column('varchar', { name: 'pin_code' })
  pinCode: string;

  @Column('boolean', { name: 'is_kkh_patient', default: true })
  isKkhPatient: boolean;

  @Column('varchar', { name: 'avatar', nullable: true })
  avatar: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'email' , nullable: true })
  email: string;

  @Column('timestamp', { name: 'date_of_birth' , nullable: true })
  dateOfBirth: Date;

  @Column('varchar', { name: 'ethnicity', nullable: true })
  ethnicity: string;

  @Column('varchar', { name : 'current_occupation', nullable: true })
  currentOccupation: string;

  @Column('varchar', { name: 'highest_attained_education', nullable: true })
  highestAttainedEducation: string;

  @Column('boolean', { name: 'has_pregnancies', default: false })
  hasPregnancies: boolean;

  @Column('int', { name: 'vaginal_deliveries', default: 0 })
  vaginalDeliveries: number;

  @Column('int', { name: 'caesarean_sections', default: 0 })
  caesareanSections: number;

  @Column('int', { name: 'miscarriages', default: 0 })
  miscarriages: number;

  @Column('boolean', { name: 'need_update_profile', default: true })
  needUpdateProfile: boolean;

  @OneToMany(() => UserViewContentModel, userViewContent => userViewContent.user)
  userViewContents: UserViewContentModel[];
}