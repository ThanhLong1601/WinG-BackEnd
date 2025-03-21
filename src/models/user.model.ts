import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base.model";
import { UserViewContentModel } from "./user_view_content.model";
import { UserContentModel } from "./user_content.model";
import { UserSettingModel } from "./user_setting.model";
import { UserSubmisArtModel } from "./user_submis_art.model";
import { UserStickerModel } from "./user_sticker.model";

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
  
  // If using way 2 in cron then change this field to like this.
  //@Column('varchar', { name: 'timezone', length: 50, default: 'UTC' })
  //timezone: string;
  @Column('int', { name: 'timezone', default: 0})
  timezone: number;

  @Column('varchar', { name: 'status' })
  status: string;

  @Column('int', { name: 'point', default: 0 })
  point: number;

  @OneToMany(() => UserViewContentModel, userViewContent => userViewContent.user)
  userViewContents: UserViewContentModel[];

  @OneToMany(() => UserContentModel, userContent => userContent.user)
  userContents: UserContentModel[];

  @OneToOne(() => UserSettingModel, userSetting => userSetting.user)
  userSetting: UserSettingModel;

  @OneToMany(() => UserSubmisArtModel, userSubmisArt => userSubmisArt.user)
  userSubmisArts: UserSubmisArtModel[];

  @OneToMany(() => UserStickerModel, userSticker => userSticker.user)
  userStickers: UserStickerModel[];
}