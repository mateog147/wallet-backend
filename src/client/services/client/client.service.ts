import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClientDto } from '../../dto/create-client.dto';
import { ClientEntity } from '../../../common/storage/databases/postgres/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/storage/databases/postgres/entities/account.entity';
import { AppEntity } from '../../../common/storage/databases/postgres/entities/app.entity';
import { AppService } from '../app/app.service';
import { ClientDto } from '../../dto/client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly appService: AppService,
  ) {}
  async findByEmail(email: string): Promise<ClientDto> {
    try {
      const client: ClientEntity = await this.clientRepository.findOneOrFail({
        where: { email: email },
      });
      const color = await this.appService.getColor(client.id);
      return {
        id: client.id,
        fullName: client.fullName,
        email: client.email,
        phone: client.phone,
        photo: client.photo,
        appColor: color,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  create(dto: CreateClientDto): Promise<ClientEntity> {
    const client = new ClientEntity();
    client.fullName = dto.fullName;
    client.email = dto.email;
    client.phone = dto.phone;
    client.photo = dto.photo;
    client.account = new AccountEntity();
    client.app = new AppEntity();
    return this.clientRepository.save(client);
  }
}
