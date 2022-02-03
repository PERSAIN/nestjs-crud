import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'secretJWT',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { userName } = payload;
    const user: User = await this.userRepository.findOne({ userName });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}