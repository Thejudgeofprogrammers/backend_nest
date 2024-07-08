import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}


    @ApiTags("API")
    @ApiResponse({status: 200, type: UpdateUserDTO})
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDTO: UpdateUserDTO, @Req() req): Promise<UpdateUserDTO> {
        const user = req.user;
        return this.userService.updateUser(user.email, updateDTO);
    };

    @ApiTags("API")
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() req) {
        const user = req.user;
        return this.userService.deleteUser(user.email);
    };
};
