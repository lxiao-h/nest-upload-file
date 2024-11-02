import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { saveFile, storage } from 'src/utils/saveFile';

@Controller('file')
export class FileController {
  constructor() { }

  @Post('upload/notknow')
  @UseInterceptors(AnyFilesInterceptor({
    storage
  }))
  async uploadFile4(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }


  @Post('/upload/samename')
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage
  }))
  async uploadFile3(@UploadedFiles() file: Array<Express.Multer.File>) {
    console.log(file)
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return saveFile(file)
  }

  @Post('/upload1')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads'
  }))
  async uploadFile1(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
  }


  @Post('/upload2')
  @UseInterceptors(FileInterceptor('file', {
    storage: storage
  }))
  async uploadFile2(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
  }


}
