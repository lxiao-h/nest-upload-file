

const fs = require('fs');
const path = require('path');
const root = process.cwd();
const multer = require('multer');

export const saveFile = (
  file: Express.Multer.File,
): { fileName: string; fullPath: string; size: string } => {
  // 生成随机字符串
  let randomString = Math.random().toString(36);

  randomString = randomString.substr(2);
  const lastName = file.originalname.split('.').pop();
  const _fileName = randomString + '.' + lastName;
  const filePath = path.join(root, '/uploads', _fileName);

  fs.writeFileSync(filePath, file.buffer);
  return {
    fileName: _fileName,
    size: file.size.toString(),
    fullPath: filePath,
  };
};


export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})