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
      return response.data;
    } catch (error) {
      throw new BadRequestException('Cannot Fetch video');
    }
  }
}
