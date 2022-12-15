import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntity } from '../../../common/storage/databases/postgres/entities/app.entity';
import { UpdateColorDto } from '../../dto/update-color.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>,
  ) {}
  async getColor(id: string) {
    const app = await this.appRepository.findOne({
      where: { cliId: id },
    });

    return app.color;
  }

  async updateColor(dto: UpdateColorDto): Promise<UpdateColorDto> {
    const res = await this.appRepository.update(
      { cliId: dto.cliId },
      { color: dto.color },
    );
    console.log('res', res);
    return dto;
  }
}
