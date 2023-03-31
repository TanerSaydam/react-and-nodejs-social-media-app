const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const upload = require("../services/upload.service");
const removeFile = require("../services/remove-file.service");
const File = require("../dtos/file");
var detect = require('detect-file-type');
const response = require("../services/response.service");
const jwt = require("jsonwebtoken");

const secretKey = "my secret key my secret key 1234.!."
const options = {
    expiresIn: "1h"
}
router.post("/register", upload.single("image"), async (req, res) => {
    await response(req, res, async () => {
        const user = new User(req.body);

        const checkUserName = await User.findOne({ userName: user.userName }); //null dönmesi lazım
        if (checkUserName == null) {
            const file = new File(req.file);
            //detect.fromFile(file.path, async (err, result) => {
                //if (result.ext == "jpg" || result.ext == "png" || result.ext == "jpeg") {
                    // if (file.mimetype != "image/jpeg") {
                    //     removeFile([req.file]);
                    //     res.status(403).json({ message: "Avatar kısmına sadece .jpeg | jpg formatında resim dosyaları eklenebilir!" })
                    // } else if (file.mimetype != "image/jpeg") {
                    //     removeFile([req.file]);
                    //     res.status(403).json({ message: "Avatar kısmına sadece .jpeg | jpg formatında resim dosyaları eklenebilir!" })
                    // }else{
                        if (file.size > 5242880) {
                            removeFile([req.file]);
                            res.status(403).json({ message: "Avatar resmi en fazla 5mb olabilir!" });
                        } else {
                            user._id = uuidv4();
                            user.createdDate = new Date();
                            user.avatar = req.file;
                            await user.save();
                            
                            const token = jwt.sign({},secretKey,options);
                            const model = {token: token, user: user};
                            res.json(model);
                        }            
                    //}
                // }else{
                //     removeFile([req.file]);
                //         res.status(403).json({ message: "Avatar kısmına sadece .jpeg | jpg formatında resim dosyaları eklenebilir!" })
                // }
            //});            
        } else {
            removeFile([req.file]);
            res.status(403).json({ message: "Bu kullanıcı adı daha önce alınmış!" });
        }
    });

});

router.post("/login", async(req,res)=>{
    response(req,res,async ()=>{
        const {userName, password} = req.body;
        const user = await User.findOne({userName: userName});
        if(user == null){
            res.status(403).json({message: "Kullanıcı adı bulunamadı!"});
        }else{
            if(user.password != password){
                res.status(403).json({message: "Şifre yanlış!"});
            }else{
                const token = jwt.sign({},secretKey,options);
                const model = {token: token, user: user};
                res.json(model);
            }
        }
    })
})

module.exports = router;
