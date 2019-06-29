import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';
import { multerOptions } from '../../services/upload/multer.config'


@Controller('upload')
export class UploadController {

    @Post('upload_single_file')
    @UseInterceptors(FileInterceptor('file', multerOptions)) // injected file name 'file'
    UploadFile(@UploadedFile() file, @Res() res) { // injected file object
        console.log(file)
        return file;

    }

    @Get('get_file/:file_name')
    async getFile(@Param('file_name') filename, @Res() res ): Promise<any> {
        console.log('serve file ' + filename)
        res.sendFile(filename, { root:  'uploads'});
    }
}
