import { Controller, Get, HttpStatus, NotFoundException, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync, } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
    @Post()
    @UseInterceptors(AnyFilesInterceptor())
    uploadfile(@UploadedFile() files: Array<Express.Multer.File>){
        console.log('FILES', files)
    }
    
    @Get(':filename')
    getFile(@Param('filename') filename: string): StreamableFile {
        
        const path =  join(process.cwd(), './upload', filename);
        if(!existsSync(path)){
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: 'File not found',
              });
        }
        const file = createReadStream(path);
        return new StreamableFile(file);
    }
}
