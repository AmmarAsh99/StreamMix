import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUser } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(user: CreateUser) {
    // SELECT * FROM USERS WHERE EMAIL = user.email
    const existingUser = await this.userRepo.findOneBy({ email: user.email });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser = this.userRepo.create({
      email: user.email,
      password: hashedPassword,
    });

    return this.userRepo.save(newUser);
  }

  async findUserByEmail(email: string) {
    // SELECT * FROM user WHERE email = email
    return this.userRepo.findOneBy({ email: email });
    // {
    //   id: 1
    //   email: dsdadsadas
    //   pass:dsadasdas
    // }
  }
}
