import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly tokenService: TokenService
    ) {};

    async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if (existUser) throw new BadRequestException(AppError.USER_EXIST);
        return this.userService.createUser(dto);
    };

    async loginUser(dto: UserLoginDTO): Promise<any> {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
        const validatePassword = await bcrypt.compare(dto.password, existUser.password); // true or false сравнение
        if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
        const user = await this.userService.publicUser(dto.email);
        const token = await this.tokenService.generateJwtToken(user);
        return { user, token };
    };
};
