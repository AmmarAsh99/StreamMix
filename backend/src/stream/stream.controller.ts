import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { StreamService } from './stream.service';
import { CheckUrl } from './dto/url.dto';
import type { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('stream')
export class StreamController {
  constructor(private getFetch: StreamService) {}
  @UseGuards(AuthGuard)
  @Get()
  async getVideo(@Query() query: CheckUrl, @Res() res: Response) {
    const stream = await this.getFetch.fetchVid(query.url);
    res.setHeader('Content-Type', 'video/mp4');
    stream.pipe(res);
  }
}
