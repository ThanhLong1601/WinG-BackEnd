import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseModel } from "./base.model"
import { UserModel } from "./user.model";

@Entity('user_settings')
export class UserSettingModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'usid' })
  usid: string;

  @Column('varchar', { name: 'uid' })
  uid: string;

  @Column('boolean', { name: 'chatbot_updates', default: true})
  chatbotUpdates: boolean;

  @Column('boolean', { name: 'new_enrich_updates', default: true})
  newEnrichUpdates: boolean;

  @Column('boolean', { name: 'general_reminders_and_updates', default: true})
  generalRemindersAndUpdates: boolean;

  @OneToOne(() => UserModel, (user) => user.userSetting)
  @JoinColumn({ name: 'uid' })
  user: UserModel;
}