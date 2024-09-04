const multer = require("multer");
const fs = require("node:fs");
const path = require("node:path");

const uploader = (pathName) => {
  const isDirectoryExist = fs.existsSync(path.join(process.cwd(), pathName));
  if (!isDirectoryExist) {
    fs.mkdirSync(path.join(process.cwd(), pathName), { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), pathName));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix =
        Date.now() +
        "-" +
        crypto.randomUUID() +
        Math.round(Math.random() * 1e9 * 987);
      const fileExtension = path.extname(file.originalname);
      const fileFullName = `${uniqueSuffix}${fileExtension}`;
      cb(null, fileFullName);
    },
  });
  return multer({ storage });
};

module.exports = { uploader };
