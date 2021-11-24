import Product from '../model/products'
import slugify from 'slugify';
export const list =async (req,res) =>{
    const product = await Product.find().limit(+req.query.limit).exec();
    res.json(product)
}
export const read =async (req,res) =>{
    const product = await Product.find({id: req.params._id}).exec()
    res.json(product)
}
export const update = async (req,res) =>{
    const {name,price,decscription,quantity,img,category} = req.body;
    try {
        const product = await Product.findOneAndUpdate(
            {id: req.params._id},
            {name,price,decscription,quantity,img,category,slug: slugify(name)},
            {new:true}
        )
        res.json(product)
    } catch (error) {
        res.status(400).json({message: "Sai là đéo làm nữa"})
    }
}
export const create =async (req,res) =>{
    try {
        const {name,price,decscription,quantity,img,category} = req.body;
        const product = await new Product({name,price,decscription,quantity,img,category,slug: slugify(name)}).save()
        res.json(product)
    } catch (error) {
        res.status(400).json({message:"Lại sai"})
    }
}
export const remove = async (req,res) =>{
    try{
        const remove = await Product.findOneAndDelete({id:req.params._id})
        res.json(remove);
    }catch(error){
        res.status(400).send("Lại sai")
    }
}