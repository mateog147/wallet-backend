import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateClientDto } from '../../dto/create-client.dto';
import { ClientService } from '../../services/client/client.service';
import { ClientEntity } from '../../../common/storage/databases/postgres/entities/client.entity';
import { ClientDto } from '../../dto/client.dto';
import { NotFoundErrorsInterceptor } from '../../../common/interceptors/not-found-errors.interceptor';

@Controller('api/v1/client')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@UseInterceptors(NotFoundErrorsInterceptor)
export class ClientController {
  constructor(private readonly service: ClientService) {}
  @Post()
  async newClient(@Body() dto: CreateClientDto): Promise<ClientEntity> {
    return await this.service.create(dto);
  }

  @Get(':email')
  async getClientData(@Param('email') email: string): Promise<ClientDto> {
    return await this.service.findByEmail(email);
  }
}
