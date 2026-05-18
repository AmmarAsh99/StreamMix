import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StreamService {
  constructor(private readonly httpService: HttpService) {}

  async fetchVid(url: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { responseType: 'stream' }),
      );
      console.log('[Axios Stream Status]:', response.status);
      console.log('[Axios Stream Headers]:', response.headers);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Cannot Fetch video');
    }
  }
}
