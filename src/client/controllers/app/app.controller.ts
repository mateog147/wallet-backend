import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientTokenGuard } from '../../../common/guards/client-token.guard';
import { UpdateColorDto } from '../../dto/update-color.dto';
import { AppService } from '../../services/app/app.service';

@Controller('/api/v1/client/theme')
@ApiTags('App')
@UseGuards(ClientTokenGuard)
export class AppController {
  constructor(private readonly service: AppService) {}
  @Put()
  @ApiOperation({
    summary: 'Update the color of a App related to a client',
    description: 'Update app color.',
  })
  @ApiBody({
    type: UpdateColorDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Color Updated',
    type: UpdateColorDto,
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
  async updateThemeColor(@Body() dto: UpdateColorDto): Promise<UpdateColorDto> {
    return this.service.updateColor(dto);
  }
}
