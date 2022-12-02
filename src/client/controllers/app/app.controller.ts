import { Body, Controller, Post } from '@nestjs/common';
import { UpdateColorDto } from '../../dto/update-color.dto';
import { AppService } from '../../services/app/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly service: AppService) {}
  @Post()
  updateThemeColor(@Body() dto: UpdateColorDto) {
    return this.service.updateColor(dto);
  }
}
