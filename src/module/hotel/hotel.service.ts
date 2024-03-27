import { HttpException, Injectable } from "@nestjs/common";
import { HotelDto } from "../../common/dto/hotel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hotels } from "../../core/database/entity/hotels.entity";
import { ImageService } from "../image/image.service";
import { UpdateHotelDto } from "../../common/dto/updateHotel.dto";
import { Country } from "../../core/database/entity/country.entity";


@Injectable()
export class HotelService {

  constructor(
    @InjectRepository(Hotels)
    private readonly hotelRepository: Repository<Hotels>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private imageService: ImageService
  ) {}

  async create(data: HotelDto) {
    const country = await this.countryRepository.findOneOrFail({
      where: {id: data.country}
    }).catch(()=>
      {
        throw new HttpException('Country not found', 404)
      }
    )

    const save = await this.hotelRepository.save(
      {
        name: data.name,
        country: country,
        persons: data.persons,
        transport: data.transport,
        startDate: data.startDate,
        period: data.period,
        food: data.food,
        toHotel: data.toHotel,
      }).catch((err)=>
      {
        console.log(err)
        throw new HttpException('Error to add to DB(maybe this hotel already exist)', 500)
      }
    )
    return save
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

  async update(id: {id: string}, data: UpdateHotelDto){
    await this.hotelRepository.update(id, {
      name: data.name,
      persons: data.persons,
      transport: data.transport,
      startDate: data.startDate,
      period: data.period,
      food: data.food,
      toHotel: data.toHotel,
    }).catch((err)=>
      {
        console.log(err);
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


  // async uploadPhoto(file: Express.Multer.File, id: {id: string}){
  //   const name = await this.imageService.upload(file);
  //   await this.hotelRepository.update(id, {photos: name}).catch(()=>
  //     {
  //       throw new HttpException('Error to update to DB', 500)
  //     }
  //   )
  //   return {
  //     message: 'success'
  //   }
  // }

  // async getPhoto(id: {id: string}){
  //   const hotel = await this.hotelRepository.findOneOrFail({
  //     where: id
  //   }).catch(()=>
  //     {
  //       throw new HttpException('Hotel not found', 404)
  //     }
  //   )
  //   return await this.imageService.getFromS3(hotel.photo)
  // }
}
