import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  imports: [MulterModule.register({
    storage: diskStorage({
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
      destination: './upload'
    })
    }
  )]
})
export class FileModule {}
