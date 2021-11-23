import Users from "../model/user";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
export const signup = async (req,res)=>{
    try {
        const {email, name, password}=req.body;
        const user = await new Users({email, name, password}).save();
        res.json(user)
    } catch (error) {
        res.json({message: "ĐM sai mãi mày"})
    }
}
export const signin = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await Users.findOne({email}).exec();
        if(!user){
            res.status(400).json({message: "Tài khoản không tồn tại "})
        }
        if(!user.authenticate(password)){
            res.json({message: "Email hoăc pass không đúng"})
        }
        const token = jwt.sign({_id: user._id}, '123456');
        res.cookie('token',token,{expire: new Date() + 9999})
        res.json({
            token,
            user:{_id: user._id,
                email: user.email,
                name: user.name,
                role: user.role}
        })
    } catch (error) {
        res.json({message: "False"})
    }
}
export const signout =(req,res) => {
    res.clearCookie('token');
    res.json({
        msg:"Signout oke"
    })
}
export const requireSignin = expressJwt({
    secret: '123456',
    algorithms: ["HS256"],
    userProperty: 'auth'
})
export const isAuth = (req, res,next) => {
    console.log('req profile', req.profile);
    console.log('req', req.auth);
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        res.json({
            msg:"Access Denined"
        })
    }
    next();
}
export const isAdmin = (req,res,next) =>{
    if(req.profile.role == 0){
        res.status(403).json({
            msg:"Có phải admin đâu mà vào"
        })
    }
    next();
}