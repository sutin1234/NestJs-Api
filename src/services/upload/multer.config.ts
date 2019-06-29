import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';



// Multer configuration ENV
process.env.UPLOAD_LOCATION = './uploads';
process.env.MAX_FILE_SIZE = (1 * 1000 * 1000).toString();

export const multerConfig = {
    dest: process.env.UPLOAD_LOCATION
}

export const multerOptions = {
    limit: {
        file_size: parseInt(process.env.MAX_FILE_SIZ)
    },
    fileFilter:(req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true);
        } else {
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest;
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, `${uuid()}${extname(file.originalname)}`);
        },
    })
}