import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import multiparty from 'multiparty';
import { AppService } from './app.service';
import pjson from '../package.json';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Post('file')
  async uploadFile(@Req() req, @Res() res) {
    const form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      const { Location } = await this.appService.uploadFile(fields, files);
      res.send({ url: Location })
    })
  }

  @Get('health')
  getVersion() {
    return pjson.version;
  }
}
