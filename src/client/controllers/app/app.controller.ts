import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ClientTokenGuard } from '../../../common/guards/client-token.guard';
import { UpdateColorDto } from '../../dto/update-color.dto';
import { AppService } from '../../services/app/app.service';

@Controller('/api/v1/client/theme')
@UseGuards(ClientTokenGuard)
export class AppController {
  constructor(private readonly service: AppService) {}
  @Put()
  updateThemeColor(@Body() dto: UpdateColorDto) {
    return this.service.updateColor(dto);
  }
}
