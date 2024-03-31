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
  stars!: number;

  @Column()
  city!: string;

  @Column()
  startDate!: string;

  @Column()
  period!: number;

  @Column()
  toHotel!: boolean;

  @Column()
  transport!: TransportEnum;

  @Column()
  persons!: number;

  @Column()
  insurance!: boolean;

  @Column()
  food!: FoodEnum;

  @Column()
  description1!: string;

  @Column()
  description2!: string;

  @Column({default: ''})
  mainPhoto!: string;

  @OneToMany(() => Photos, (photo) => photo.hotel)
  photos!: Photos[];

  @Column({default: true})
  isActive!: boolean;
}