
import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import ISpecality from '../../entity/specalityEntity';



const SpecalitySchema: Schema = new Schema({
  image:{type:String,required:true},
  name:{type:String,required:true},
  isDeleted:{type:Boolean,default:false}
},
{
    timestamps: true 
});


const Specality = mongoose.model<ISpecality>('Specality',SpecalitySchema);                

export default Specality;
