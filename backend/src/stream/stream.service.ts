import { HttpService } from '@nestjs/axios';
import {
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
      //httpservice return Observable -> to turn it to promise we use FirstValueFrom to accses underlying response object
      const response = await firstValueFrom(
        this.httpService.get(url, { responseType: 'stream' }),
      );
      // the issue is we download the full vid then we response back
      // sol : insted of download the vid we send the data immediatly as chuncks
      return response.data;
    } catch (error) {
      throw new HttpException(
        'failed to fetch the vid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
