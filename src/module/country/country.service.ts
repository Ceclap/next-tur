import { HttpException, Injectable } from "@nestjs/common";
import { CountryDto } from "../../common/dto/country.dto";
import { Like, Repository } from "typeorm";
import { Country } from "../../core/database/entity/country.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageService } from "../image/image.service";
import { PaginationCDto } from "../../common/dto/paginationC.dto";

@Injectable()
export class CountryService {

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private imageService: ImageService
  ) {
  }
  async create(data: CountryDto) {
    const save = await this.countryRepository.save(data).catch(()=>
      {
        throw new HttpException('Error to add to DB(maybe this country already exist)', 500)
      }
    )
    return save
  }

  async get(id: {id: string}){
    return await this.countryRepository.findOneOrFail({
      where: id
    }).catch(()=>
      {
        throw new HttpException('Country not found', 404)
      }
    )
  }

  async getAll(pagination: PaginationCDto){
    return await this.countryRepository.find({
      where: { name: Like(`%${pagination.name}%`),
        travelType: pagination.type,
        offers: pagination.offer
      }
    })
      .catch(()=>
      {
        throw new HttpException('Country not found', 404)
      }
    )
  }

  async update(id: {id: string}, data: CountryDto){
    await this.countryRepository.update(id, data).catch(()=>
      {
        throw new HttpException('Error to update to DB', 500)
      }
    )
    return data
  }
  async delete(id: {id: string}){
    await this.countryRepository.delete(id).catch(()=>
      {
        throw new HttpException('Error to delete to DB', 500)
      }
    )
    return {
      message: 'success'
    }
  }

  async uploadPhoto(file: Express.Multer.File, id: {id: string}, type: string){
    const name = await this.imageService.upload(file);
    let update;
    if(type == 'mainPhoto') {
       update = { mainPhoto: name };
    }
    else{
       update = { flag: name }
    }
    await this.countryRepository.update(id, update).catch(()=>
      {
        throw new HttpException('Error to update to DB', 500)
      }
    )
    return {
      message: 'success'
    }
  }

  async getPhoto(id: {id: string}){
    const country = await this.countryRepository.findOneOrFail({
      where: id
    }).catch(()=>
      {
        throw new HttpException('Hotel not found', 404)
      }
    )
    let mainPhoto  = undefined
    let flag  = undefined
    if(country.mainPhoto) {
       mainPhoto = await this.imageService.getFromS3(country.mainPhoto)
    }
    if(country.flag) {
      flag = await this.imageService.getFromS3(country.flag)
    }
    return {
      mainPhoto: mainPhoto,
      flag: flag
    }
  }
}
