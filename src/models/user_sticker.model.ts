import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StickerModel } from "./sticker.model";
import { UserModel } from "./user.model";

@Entity('user_sticker')
export class UserStickerModel {
  @PrimaryGeneratedColumn('uuid', { name: 'usid' })
  usid: string;

  @Column('varchar', { name: 'uid' })
  uid: string;

  @Column('varchar', { name: 'sid' })
  sid: string;

  @Column('boolean', { name: 'isUnlocked', default: false })
  isUnlocked: boolean;

  @Column('timestamp', { name: 'unlockedDate', nullable: true })
  unlockedDate: Date;

  @ManyToOne(() => StickerModel, sticker => sticker.userStickers)
  @JoinColumn({ name: 'sid' })
  sticker: StickerModel;

  @ManyToOne(() => UserModel, user => user.userStickers)
  @JoinColumn({ name: 'uid' })
  user: UserModel;
}