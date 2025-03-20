import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserStickerModel } from "./user_sticker.model";

@Entity('sticker')
export class StickerModel {
  @PrimaryGeneratedColumn('uuid', { name: 'sid' })
  sid: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'image' })
  image: string;

  @Column('int', { name: 'point', default: 0 })
  point: number;

  @Column('varchar', { name: 'status', default: 'active' })
  status: string;

  @Column('varchar', { name: 'isFree', nullable: true })
  isFree: string;

  @OneToMany(() => UserStickerModel, userSticker => userSticker.sticker)
  userStickers: UserStickerModel[];
}