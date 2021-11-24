import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required:"Viết tên vào",
        minlength: [3, "Too short"],
        maxlength: [32, "Too Long"]
    },
    price: {
        type: Number,
        trim: true,
    },
    decscription:{
        type: String,
        trim : true,
        minlength: [3, " Ngắn"],
        maxlength: [100, "Dài quá xóa bớt đi"]
    },
    quantity : {
        type: Number,
        trim: true,
    },
    img:{
        type: String,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    slug:{
        type:String,
        unique : true,
        lowercase:true,
        index: true
    }
},{timestamps:true});
export default mongoose.model('Product', productSchema)