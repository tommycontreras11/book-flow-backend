import { objectStorageConfig } from "../../config/";
import MinioStorage from "./minio";
import { Readable } from "stream";
import { UploadedObjectInfo } from "minio";
import { EXTENSION_MIME_TYPE } from "../../utils/upload.util";
import { IListOfObjects } from "./object-storage.interface";

export class ObjectStorage {
    private static _instance: ObjectStorage;
    private provider: MinioStorage
    
    private constructor() {}

    public static get instance(): ObjectStorage {
        !ObjectStorage._instance && (ObjectStorage._instance = new ObjectStorage())
        return ObjectStorage._instance
    }

    public async setConfiguration() {
        try {
            this.provider = new MinioStorage(objectStorageConfig)
            await this.provider.createBucket()
            console.log("Object Storage initialized 🎉")
        } catch (error) {
            console.log(error)
        }
    }

    public deleteDocument(filename: string): Promise<boolean> {
        return this.provider.delete(filename);
    }

    public uploadDocument(filename: string, file: string | Buffer | Readable, size: number, metadata: Record<string, any> | string): Promise<UploadedObjectInfo> {

        (typeof metadata === 'string') && (metadata = { 'Content-Type': EXTENSION_MIME_TYPE[metadata] })

        return this.provider.upload(filename, file, size, metadata)
    }


    public getOneItem(filename: string): Promise<Buffer> {
        return this.provider.download(filename)
    }

    public getUrl(filename: string): Promise<string> {
        return this.provider.generatePresignedUrl(filename)
    }

    public listOfItems(): Promise<IListOfObjects[]> {
        return this.provider.listOfObjects()
    }
}