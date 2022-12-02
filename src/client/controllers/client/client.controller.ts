import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClientDto } from '../../dto/create-client.dto';
import { ClientService } from '../../services/client/client.service';

@Controller('api/v1/client')
export class ClientController {
  constructor(private readonly service: ClientService) {}
  @Post()
  newClient(@Body() dto: CreateClientDto) {
    return this.service.create(dto);
  }

  @Get(':email')
  getClientData(@Param('email') email: string) {
    return this.service.findByEmail(email);
  }
}
