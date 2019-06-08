import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('posts')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all')
  getPost(): Observable<AxiosResponse<any[]>> {
    return this.appService.getPost();
  }

  @Get('find/:id')
  findPost(@Param() params): Observable<AxiosResponse<any[]>> {
    return this.appService.findPost(params.id);
  }

  @Post('/post')
  getPostData(@Body() body): Observable<AxiosResponse<any[]>> {
    return body;
  }

}
