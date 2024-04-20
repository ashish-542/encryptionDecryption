import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as CryptoJS from 'crypto-js';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('encrypt')
  encryptData(@Body() data): string {
    const jsonData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonData, 'secret').toString();
    return encryptedData;
  }

  @Post('decrypt')
  decryptData(@Body('encryptedData') encryptedData: string): string {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret').toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
}
