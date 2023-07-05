import multer from 'multer';
import path from 'path';

const PROOF_DIR = path.join(__dirname, '../proofs');

export const uploadProof = multer({
  storage: multer.diskStorage({
    destination: PROOF_DIR,
    filename: (req, file, cb) => {
      const { name, reserveId } = req.body;
      console.log('name', name, 'reserveId', reserveId)
      const fileExtension = path.extname(file.originalname);
      const fileName = `${name}_proof_${reserveId}`;
      console.log('proof uploaded', fileName)
      cb(null, `${fileName}${fileExtension}`);
    },
  }),
});