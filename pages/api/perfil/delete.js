import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
    }
});

export default async function deletePerfilImage(req, res) {
    if (req.method === "DELETE") {
        const { imagen } = req.body;
        const fileName = imagen.split("/").pop();

        const params = {
            Bucket: process.env.AWS_BUCKET_PERFIL_IMAGES_NAME,
            Delete: {
                Objects: [{ Key: fileName }],
            }
        };

        try {
            const data = await s3.send(new DeleteObjectsCommand(params));
            console.log(data);
            res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al eliminar archivos" });
        }

        res.status(200).json({ fileName });
    } else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).end(`Metodo ${req.method} no permitido`);
    }
}