import { HttpException, Injectable } from "@nestjs/common";
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
    await this.hotelRepository.save(data).catch(()=>
      {
        throw new HttpException('Error to add to DB(maybe this hotel already exist)', 500)
      }
    )
    return data
  }

async getAll() {
    return await this.hotelRepository.find().catch(()=>
      {
        throw new HttpException('Hotels not found', 404)
      }
    )
  }

  async get(id: {id: string}){

    return await this.hotelRepository.findOneOrFail({
      where: id
    }).catch(()=>
      {
        throw new HttpException('Hotel not found', 404)
      }
    )
  }

  async update(id: {id: string}, data: HotelDto){
    await this.hotelRepository.update(id, data).catch(()=>
      {
        throw new HttpException('Error to update to DB', 500)
      }
    )
    return data
  }

  async delete(id: {id: string}){
    await this.hotelRepository.delete(id).catch(()=>
      {
        throw new HttpException('Error to delete to DB', 500)
      }
    )
    return {
      message: 'success'
    }
  }
}
