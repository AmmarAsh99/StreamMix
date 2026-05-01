import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  getMeessage(): string {
    return 'hello from Ammar after testing';
  }
}
