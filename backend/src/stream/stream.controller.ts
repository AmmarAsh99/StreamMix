import { Controller, Get, Query, Res } from '@nestjs/common';
import { StreamService } from './stream.service';
import { CheckUrl } from './dto/url.dto';
import type { Response } from 'express';

@Controller('stream')
export class StreamController {
  constructor(private getFetch: StreamService) {}
  @Get()
  async getVideo(@Query() query: CheckUrl, @Res() res: Response) {
    const stream = await this.getFetch.fetchVid(query.url);
    res.setHeader('Content-Type', 'video/mp4');
    stream.pipe(res);
  }
}
