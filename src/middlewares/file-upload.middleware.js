import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      const name = `${Date.now().toString()}'-'${file.originalname}`
      cb(null, name)
    }
  })
  
export const upload = multer({ storage: storage })