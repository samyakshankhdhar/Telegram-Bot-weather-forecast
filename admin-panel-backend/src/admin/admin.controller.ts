import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('admin')
// @UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Put('block/:id')
  blockUser(@Param('id') id: number) {
    return this.usersService.blockUser(id);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post('settings')
  updateSettings(@Body() settings: any) {
    // Implement logic to update bot settings
  }
}
