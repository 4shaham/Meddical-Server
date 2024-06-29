

// export interface UploadResponse{
//     url:string
// }


export default interface ICloudinaryService {
    uploadImage(image:string): Promise<string>;
    deleteImage():Promise<void>;
}