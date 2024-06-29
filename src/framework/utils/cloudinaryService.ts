


import { v2 as cloudinary } from 'cloudinary';
import ICloudinaryService from '../../interface/utils/ICloudinaryService';




cloudinary.config({

    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})



export default class CloudinaryService implements ICloudinaryService {
    
    async uploadImage(image: string): Promise<string> {
        try {
            const data = await cloudinary.uploader.upload(image,{
                resource_type: "auto",
              });
             
              return data.url 
            
        } catch (error) {
            console.log(error)
            throw Error()
        }
    }

   async deleteImage(): Promise<void> { 
    
   }

}


