import Category from "../model/categories";
import slugify from "slugify";
import e from "express";
export const list =async (req,res) =>{
    const category = await Category.find().exec();
    res.json(category);
}
export const read =async (req,res) =>{
    const category = await Category.find({id: req.params._id}).exec();
    res.json(category)
}
export const update = async (req,res) =>{
    const { name } = req.body;
    try {
        const category = await Category.findOneAndUpdate(
            { id: req.params._id },
            { name, slug: slugify(name) },
            { new: true });
        res.json(category);
    } catch (error) {
        res.status(400).json({message: "Update category failed"})
    }
}
export const create =async (req,res) =>{
    try {
        const {name} = req.body;
        const category = await new Category({name, slug: slugify(name)}).save();
        res.json(category);
    } catch (error) {
        res.status(400).json({message: "Create category failed"})
    }
    
}
export const remove =async (req,res) =>{
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
        res.json(deleted);
    } catch (error) {res.status(400).send("Deleted failed")}
}