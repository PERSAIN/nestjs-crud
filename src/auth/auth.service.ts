import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCretentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCretentialsDto: AuthCretentialsDto): Promise<void> {
    return this.userRepository.createUser(authCretentialsDto);
  }

  async signIn(
    authCretentialsDto: AuthCretentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userName, password } = authCretentialsDto;
    const user = await this.userRepository.findOne({ userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { userName };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
