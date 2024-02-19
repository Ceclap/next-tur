import { Injectable } from '@nestjs/common';

@Injectable()
export class CountryService {

  async create() {
    return 'This action adds a new country';
  }
}
