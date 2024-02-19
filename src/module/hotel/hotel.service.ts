import { Injectable } from '@nestjs/common';
import { HotelDto } from "../../common/dto/hotel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../../core/database/entity/auth.entity";
import { Repository } from "typeorm";
import { Hotels } from "../../core/database/entity/hotels.entity";

@Injectable()
export class HotelService {

  constructor(
    @InjectRepository(Hotels)
    private readonly hotelRepository: Repository<Hotels>,
  ) {}

  async create(data: HotelDto) {
    await this.hotelRepository.save(data)
    return data
  }
}
