import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import { TransportEnum } from "../../../common/enum/transport.enum";
import { FoodEnum } from "../../../common/enum/food.enum";
import { Photos } from "./photo.entity";

@Entity()
export class Hotels {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  country_id!: string;

  @ManyToOne(() => Country, (country) => country.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country!: Country;

  @Column()
  startDate!: string;

  @Column()
  transport!: TransportEnum;

  @Column()
  toHotel!: boolean;

  @Column()
  period!: number;

  @Column()
  food!: FoodEnum;

  @Column()
  persons!: number;

  @Column({default: ''})
  mainPhoto!: string;

  // @OneToMany(() => Photos, (photo) => photo.hotel)
  // photos!: Photos[];

}