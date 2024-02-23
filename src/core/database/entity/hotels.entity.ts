import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import { TransportEnum } from "../../../common/enum/transport.enum";
import { FoodEnum } from "../../../common/enum/food.enum";

@Entity()
export class Hotels {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  // @Column()
  // country_id!: string;
  //
  // @ManyToOne(() => Country, (country) => country.id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'country_id' })
  // country!: Country;

  @Column()
  country!: string;

  @Column()
  persons!: number;

  @Column()
  transport!: TransportEnum;

  @Column()
  startDate!: string;

  @Column()
  period!: number;

  @Column()
  food!: FoodEnum;

  @Column({default: ''})
  photo!: string;
}