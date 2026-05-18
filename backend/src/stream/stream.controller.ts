import {
  Controller,
  Get,
  Header,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { CheckUrl } from './dto/url.dto';

@Controller('stream')
export class StreamController {
  constructor(private getFetch: StreamService) {}
  // @UseGuards(AuthGuard)
  @Get()
  @Header('Content-Type', 'video/mp4')
  async getVideo(@Query() query: CheckUrl): Promise<StreamableFile> {
    // Ensure fetchVid returns a Node.js Readable stream or a Buffer
    const stream = await this.getFetch.fetchVid(query.url);

    return new StreamableFile(stream);
  }
}
