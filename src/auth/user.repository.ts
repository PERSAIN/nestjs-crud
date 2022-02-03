import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCretentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCretentialsDto): Promise<void> {
    const { userName, password } = authCredentialsDto;
    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(password, salt);
    const user = this.create({ userName, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
