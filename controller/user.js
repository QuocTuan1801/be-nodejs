import Users from "../model/user"
export const userById = async(req, res,next, id)=>{
    const user = await Users.findById(id).exec();
    req.profile= user;
    next();
}