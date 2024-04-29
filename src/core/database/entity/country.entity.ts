import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hotels } from "./hotels.entity";
import { TravelTypeEnum } from "../../../common/enum/travelType.enum";

@Entity()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({default: ''})
  name!: string;

  @Column({ default: '' })
  description!: string;

  @Column({ default: '' })
  flag!: string;

  @Column({ default: '' })
  travelType: TravelTypeEnum;

  @Column({ default: false })
  offers: boolean;

  @Column({ default: '' })
  mainPhoto!: string;

  @OneToMany(() => Hotels, (hotel) => hotel.country)
  hotels!: Hotels[];
}