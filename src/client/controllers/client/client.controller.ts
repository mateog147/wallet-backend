import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateClientDto } from '../../dto/create-client.dto';
import { ClientService } from '../../services/client/client.service';
import { ClientEntity } from '../../../common/storage/databases/postgres/entities/client.entity';
import { ClientDto } from '../../dto/client.dto';
import { NotFoundErrorsInterceptor } from '../../../common/interceptors/not-found-errors.interceptor';
import { ClientTokenGuard } from '../../../common/guards/client-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1/client')
@ApiTags('Client')
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
  @UseGuards(ClientTokenGuard)
  @ApiOperation({
    summary: 'Create client',
    description: 'Create a new client into the DB.',
  })
  @ApiBody({
    type: CreateClientDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Client created',
    type: ClientEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Bad request, review the token',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, review all the params',
  })
  @ApiBearerAuth('access-token')
  async newClient(@Body() dto: CreateClientDto): Promise<ClientEntity> {
    return await this.service.create(dto);
  }

  @Get(':email')
  @UseGuards(ClientTokenGuard)
  @ApiOperation({
    summary: 'Returns the relevant info of a Client',
    description: 'GET client.',
  })
  @ApiResponse({
    status: 200,
    description: 'Client',
    type: ClientDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Bad request, review the token',
  })
  @ApiResponse({
    status: 400,
    description: 'Be sure that the client already exists on the data base',
  })
  @ApiBearerAuth('access-token')
  async getClientData(@Param('email') email: string): Promise<ClientDto> {
    return await this.service.findByEmail(email);
  }
}
