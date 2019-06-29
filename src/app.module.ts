import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './controllers/upload/upload.controller';
import { UploadService } from './services/upload/upload.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [HttpModule, MulterModule.register({
    dest: './uploads'
  })],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
