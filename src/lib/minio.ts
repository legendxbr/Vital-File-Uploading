import { Client } from "minio"

export const minioClient = new Client({
    endPoint: 'yamacha-forum-dev-minio.pb1quq.easypanel.host',
    port: 443,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string,
})