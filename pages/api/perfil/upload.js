import multer from "multer";
import multers3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
    }
});

export const config = {
    api: { bodyParser: false }
}

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_PERFIL_IMAGES_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            let extension = file.originalname.split(".");
            extension = extension[extension.length - 1];
            let fechaAAAAMMDD = new Date().toISOString().split("T")[0];
            cb(null, Date.now().toString() + "-" + fechaAAAAMMDD.toString() + "." + extension);
        },
        acl: "public-read"
    }),
});

export default async function uploadPerfilImage(req, res) {
    if (req.method === "POST") {
        try {
            upload.single("file")(req, res, (error) => {
                if (error) {
                    if (error.code === "LIMIT_UNEXPECTED_FILE") {
                        res.status(500).json({ message: "Solo se permite subir una imagen a este servicio" });
                    } else {
                        res.status(500).json({ error });
                    }
                } else {
                    res.status(200).json({
                        rutaimagen: process.env.NEXT_PUBLIC_AWS_BUCKET_PERFIL_IMAGES,
                        imagen: req.file.key
                    });
                }
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Metodo ${req.method} no permitido`);
    }
}