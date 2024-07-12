import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {}
    
    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 10);
        } catch (err) {
            throw new Error(err);
        };
    };

    async findUserByEmail(email: string): Promise<User> {
        try {
            return this.userRepository.findOne({ where: { email } });
        } catch (err) {
            throw new Error(err);
        };
    };

    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            dto.password = await this.hashPassword(dto.password);
            await this.userRepository.create({
                firstName: dto.firstName,
                userName: dto.userName,
                email: dto.email,
                password: dto.password
            });
            return dto;
        } catch (err) {
            throw new Error(err);
        };
    };

    async publicUser(email: string): Promise<User> {
        try {
            return this.userRepository.findOne({
                where: {email},
                attributes: {exclude: ['password']}, // исключение поля пароль 
                include: {
                    model: Watchlist,
                    required: false
                } // бд возвращает
            });
        } catch (err) {
            throw new Error(err);
        };
    };

    async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
        try {
            await this.userRepository.update(dto, { where: {email} });
            return dto;
        } catch (err) {
            throw new Error(err);
        };
    };

    async deleteUser(email: string): Promise<boolean> {
        try {
            await this.userRepository.destroy({ where: {email} });
            return true;
        } catch (err) {
            throw new Error(err);
        };
    };
};
