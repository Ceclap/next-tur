import { Injectable } from '@nestjs/common';

@Injectable()
export class TariService {

  async tari() {
    return 'tari';
  }
}
