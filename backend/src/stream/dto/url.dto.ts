import { IsNotEmpty } from 'class-validator';

export class CheckUrl {
  @IsNotEmpty()
  url!: string;
}
