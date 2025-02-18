import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";

@Entity('users')
export class UserModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'uid' })
  uid: string;

  @Column('varchar', { name: 'phone' })
  phone: string;

  @Column('varchar', { name: 'pin_code' })
  pinCode: string;

  @Column('varchar', { name: 'is_kkh_patient', default: true })
  isKkhPatient: boolean;

  @Column('varchar', { name: 'avatar', nullable: true })
  avatar: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'email' , nullable: true })
  email: string;

  @Column('varchar', { name: 'date_of_birth' , nullable: true })
  dateOfBirth: string;

  @Column('varchar', { name: 'ethnicity', nullable: true })
  ethnicity: string;

  @Column('varchar', { name : 'current_occupation', nullable: true })
  currentOccupation: string;

  @Column('varchar', { name: 'highest_attained_education', nullable: true })
  highestAttainedEducation: string;

  @Column('boolean', { name: 'has_pregnancies', default: true })
  hasPregnancies: boolean;

  @Column('int', { name: 'vaginal_deliveries', nullable: true })
  vaginalDeliveries: number;

  @Column('int', { name: 'caesarean_sections', nullable: true })
  caesareanSections: number;

  @Column('int', { name: 'miscarriages', nullable: true })
  miscarriages: number;

  @Column('boolean', { name: 'need_update_profile', default: true })
  needUpdateProfile: boolean;

}