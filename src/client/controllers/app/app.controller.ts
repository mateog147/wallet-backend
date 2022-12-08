import { Body, Controller, Put } from '@nestjs/common';
import { UpdateColorDto } from '../../dto/update-color.dto';
import { AppService } from '../../services/app/app.service';

@Controller('/api/v1/client/theme')
export class AppController {
  constructor(private readonly service: AppService) {}
  @Put()
  updateThemeColor(@Body() dto: UpdateColorDto) {
    return this.service.updateColor(dto);
  }
}
