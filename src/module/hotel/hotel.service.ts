import { HttpException, Injectable } from "@nestjs/common";
import { HotelDto } from "../../common/dto/hotel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hotels } from "../../core/database/entity/hotels.entity";
import { ImageService } from "../image/image.service";
import { UpdateHotelDto } from "../../common/dto/updateHotel.dto";
import { Country } from "../../core/database/entity/country.entity";
import { Photos } from "../../core/database/entity/photo.entity";
import process from "process";


@Injectable()
export class HotelService {

  constructor(
    @InjectRepository(Hotels)
    private readonly hotelRepository: Repository<Hotels>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Photos)
    private readonly photosRepository: Repository<Photos>,
    private imageService: ImageService
  ) {}

  async create(data: HotelDto) {
    const { country, ...info } = data
    const Country = await this.countryRepository.findOneOrFail({
      where: {id: country}
    }).catch(()=>
      {
        throw new HttpException('Country not found', 404)
      }
    )

    const save = await this.hotelRepository.save(
      {
        ...info,
        country: Country
      }).catch((err)=>
      {
        console.log(err)
        throw new HttpException('Error to add to DB(maybe this hotel already exist)', 500)
      }
    )
    return save
  }

async getAll() {
    return await this.hotelRepository.find({
      relations: { photos: true },
      where: { isActive: true }
    }).catch(()=>
      {
        throw new HttpException('Hotels not found', 404)
      }
    )
  }

  async get(id: {id: string}){

    return await this.hotelRepository.findOneOrFail({
      relations: { photos: true },
      where: id
    }).catch(()=>
      {
        throw new HttpException('Hotel not found', 404)
      }
    )
  }

  async update(id: {id: string}, data: UpdateHotelDto){
    const { country, ...info } = data
    let Country = undefined
    if(data.country != undefined){
       Country = await this.countryRepository.findOneOrFail({
        where: {id: country}
      }).catch(()=>
        {
          throw new HttpException('Country not found', 404)
        }
      )
    }
    await this.hotelRepository.update(id, {
      ...info,
      country: Country
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
  async uploadPhoto(file: Express.Multer.File, id: {id: string}){
    const hotel =  await this.hotelRepository.findOneOrFail({
      where: id
    }).catch(()=>
      {
        throw new HttpException('Hotel not found', 404)
      }
    )
    const name = await this.imageService.upload(file);

    await this.photosRepository.save({
      hotel: hotel,
      name: name
    }).catch(()=>
      {
        throw new HttpException('Error to add to DB', 500)
      }
    )
    return {
      message: 'success'
    }
  }
  async uploadMainPhoto(file: Express.Multer.File, id: {id: string}){
    const name = await this.imageService.upload(file);
    const mainPhoto = `localhost:9000/${process.env['BUCKET_NAME']}/${name}`
      await this.hotelRepository.update(id, {mainPhoto: mainPhoto}).catch(()=>
      {
        throw new HttpException('Error to update to DB', 500)
      }
    )
    return {
      message: 'success'
    }
  }
}
