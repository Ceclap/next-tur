import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hotels } from "./hotels.entity";

@Entity()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ default: '' })
  description!: string;

  @Column({ default: '' })
  flag!: string;

  @Column({ default: '' })
  mainPhoto!: string;

  @OneToMany(() => Hotels, (hotel) => hotel.country)
  hotels!: Hotels[];
}