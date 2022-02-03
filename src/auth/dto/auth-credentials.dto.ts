import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCretentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  userName: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is weak',
  })
  password: string;
}
