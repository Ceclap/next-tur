import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotels } from "./hotels.entity";

@Entity()
export class Photos {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  hotel_id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Hotels, (hotel) => hotel.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hotel_id' })
  hotel!: Hotels;

}