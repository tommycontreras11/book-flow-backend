import { Client, UploadedObjectInfo } from 'minio';
import { Readable } from 'stream';
import { IListOfObjects, IObjectStorageConfig } from './object-storage.interface';

class MinioStorage {

    private readonly client: Client;
    private readonly bucket: string;

    constructor({
        bucket,
        url: endPoint,
        port,
        ssl: useSSL,
        accessKey,
        secretKey
    }: IObjectStorageConfig) {
        this.client = new Client({
            endPoint,
            port,
            useSSL,
            accessKey,
            secretKey
        });
        this.bucket = bucket
    }

    public async createBucket(): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this.client.bucketExists(this.bucket, (error, exists) => {
                if (error) return reject(error)

                if (exists) return resolve(true)

                this.client.makeBucket(this.bucket, (error) => {
                    if (error) return reject(error)
                    return resolve(true)
                })
            })
        })
    }

    public async upload(filename: string, file: string | Buffer | Readable, size: number, metadata: Record<string, any>): Promise<UploadedObjectInfo> {
        return new Promise((resolve, reject) => {
            this.client.putObject(this.bucket, filename, file, size, metadata, (error, info) => {
                if (error) return reject(error)
                return resolve(info)
            })
        })
    }

    public async download(filename: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            this.client.getObject(this.bucket, filename, (error, stream) => {
                if (error) return reject(error)

                const buffers: Array<Uint8Array> = [];

                stream.on("data", buffers.push.bind(buffers));

                stream.on('end', () => {
                    const buffer = Buffer.concat(buffers);
                    return resolve(buffer);
                })

                stream.on('error', (error) => reject(error))
            })
        })
    }

    public async listOfObjects(): Promise<IListOfObjects[]> {

        return new Promise((resolve, reject) => {
            const stream = this.client.listObjects(this.bucket, '', true)
            const data: IListOfObjects[] = []

            stream.on('data', (obj: IListOfObjects) => {
                data.push(obj)
            });

            stream.on('end', () => resolve(data));

            stream.on('error', (error) => {
                reject(error)
            });
        })
    }

    public async generatePresignedUrl(filename: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.client.presignedGetObject(this.bucket, filename, (error, url) => {
                if (error) return reject(error)
                return resolve(url)
            })
        })
    }

    public async delete(filename: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.client.presignedGetObject(this.bucket, filename).catch((error) => {
                reject(error)
                resolve(false)
            })

            resolve(true);
        })
    }
}

export default MinioStorage