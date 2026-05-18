import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  getMeessage(): string {
    return 'this endpoint for testing only';
  }
}
