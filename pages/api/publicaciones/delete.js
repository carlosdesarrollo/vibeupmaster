import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
    }
});


export default async function deletePost(req, res) {
    if (req.method === "DELETE") {
        const { imagenes } = req.body;
        const filesNames = imagenes.map((imagen) => {
            const fileName = imagen.split("/").pop();
            return { Key: fileName };
        });

        const params = {
            Bucket: process.env.AWS_BUCKET_PUBLICACIONES_NAME,
            Delete: {
                Objects: filesNames,
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

        res.status(200).json({ filesNames });
    } else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).end(`Metodo ${req.method} no permitido`);
    }
}