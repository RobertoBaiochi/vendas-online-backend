import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Controller('address')
export class AddressController {
  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private cityService: CityService,
  ) {}

  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddresDto: CreateAddressDto,
    @Param('userId') userId: number,
  ) {
    await this.userService.findUserById(userId);

    await this.cityService.findCityById(createAddresDto.cityId);

    return this.addressService.createAddress(createAddresDto, userId);
  }
}
