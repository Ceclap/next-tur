import { HttpException, Injectable } from "@nestjs/common";
import { RegisterDto } from "../../common/dto/register.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../../core/database/entity/auth.entity";
import { Repository } from "typeorm";
import { MailService } from "../mail/mail.service";
import { LoginDto } from "../../common/dto/login.dto";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {
  }

  async register(data: RegisterDto) {
    const { email, password, username } = data;

    const userExist = await this.authRepository.findOne({
      where: { email },
    })

    if (userExist) throw new HttpException('User already exist', 409)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.authRepository.save({
      email,
      password: hash,
      username
    })

    const access_token = this.jwtService.sign({ id: user.id }, {
      secret: process.env['JWT_SECRET'],
      expiresIn: process.env['JWT_EXPIRES_IN'],
    })

    await this.mailService.sendUserConfirmation(email, 'Confirm your email', 'Confirm your email by this link: http://localhost:3000/auth/confirm/' + access_token)
    console.log(access_token)
    return {
      message: 'success'
    }
  }

  async confirm(access_token: string) {
    const { id } = await this.jwtService.verifyAsync(access_token, {
      secret: process.env['JWT_SECRET']
    })
    const user = await this.authRepository.findOneOrFail({ where: { id: id } })
    if (!user) {
      throw new HttpException('Not Found User', 404)
    }
    await this.authRepository.update(user.id, { confirmed: true })
    return {
      userId: user.id
    }
  }

  async login(data: LoginDto) {
    const { email, username, password } = data;
    const critery = email ? { email } : { username }

    if (!critery) {
      throw new HttpException('User not found', 404)
    }

    const user = await this.authRepository.findOneOrFail({
        where: critery
      },
    ).catch(
      () => {
        throw new HttpException('User not found', 404)
      }
    )

    const passCompareRes = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passCompareRes) {
      throw new HttpException('Wrong password', 400);
    }
    if (!user.confirmed) {
      throw new HttpException('User not confirmed', 400);
    }

    const access_token = this.jwtService.sign({ id: user.id }, {
      secret: process.env['JWT_SECRET'],
      expiresIn: process.env['JWT_EXPIRES_IN'],
    })
    const refresh_token = this.jwtService.sign({ id: user.id }, {
      secret: process.env['JWT_REFRESH_SECRET'],
      expiresIn: process.env['JWT_REFRESH_EXPIRES_IN']
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      access_token: access_token,
      refresh_token: refresh_token
    }
  }


}
