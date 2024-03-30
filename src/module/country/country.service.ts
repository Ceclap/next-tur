import { HttpException, Injectable } from "@nestjs/common";
import { CountryDto } from "../../common/dto/country.dto";
import { Like, Repository } from "typeorm";
import { Country } from "../../core/database/entity/country.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "../../common/dto/pagination.dto";

@Injectable()
export class CountryService {

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
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

  async getAll(pagination: PaginationDto){
    return await this.countryRepository.find({
      order: {
        name: pagination.order,
      },
      take: pagination.take,
      skip: pagination.skip,
      where: { name: Like(`%${pagination.name}%`),
        travelType: pagination.type}})
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
}
