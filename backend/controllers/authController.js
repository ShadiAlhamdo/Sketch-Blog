const asycHandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const {User,validateRegisterUser, validateLoginUser,generateAuthToken}=require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto=require("crypto");
const sendEmail=require("../utils/sendEmail")
/*----------------------------------------
 * @desc Register New User - sign UP
 * @router /api/auth/register
 * @method Post
 * @access public
 *---------------------------------------- 
 */

 module.exports.regiserUserCtrl=asycHandler(async(req,res)=>{
     ///  Validation
    const {error}=validateRegisterUser(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //is User Already Exists

    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({message:"user already exist"});
    }
    // hash the password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);
  
    // new user and save it to db

    user= new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword,
    });
    await user.save()
    // Creating New Verification & Save it Yo DB
    const verificationtoken=new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationtoken.save();
    // Making the Link 
    const link=`${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationtoken.token}`
    //  Putting The Link Into An Html Template  
    const htmlTemplate=`
        <div>
        <p>Click On The Link Below TO verfiy Your Email</p>
        <a href="${link}">Verify</a>
        </div> `;
    // Sending Email To The User
    await sendEmail(user.email,"Verify Your Email",htmlTemplate);



    //Send Response to Client

    res.status(201).json({message:"We Send To You An Email Please Verify Your Email Address"});
 } );


 
/*----------------------------------------
 * @desc  Login User 
 * @router /api/auth/login
 * @method Post
 * @access public
 *---------------------------------------- 
 */
 module.exports.loginUserCtrl=asycHandler(async (req,res)=>{
    
    // 1.Validation
    const {error}=validateLoginUser(req.body)
    if(error){
        console.log(error.details[0].message)
        return res.status(400).json({message:error.details[0].message})
    }
    // 2.Is User exist 
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({message:"invalid email or password"});
    }
    // 3.Check the Password 
    
   

    const isPsswordMatch=await bcrypt.compare(req.body.password,user.password);
    if(!isPsswordMatch){
        res.status(400).json({message:"invalid email or password"})

    }

    //sending email (verify if not verified)
    if(!user.isAccountVerified){
        let verificationtoken=await VerificationToken.findOne({
            userId:user._id
        });
        if(!verificationtoken){
            verificationtoken=new VerificationToken({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex")
            });
            await verificationtoken.save()
        }

            // Making the Link 
    const link=`${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationtoken.token}`
    //  Putting The Link Into An Html Template  
    const htmlTemplate=`
        <div>
        <p>Click On The Link Below TO verfiy Your Email</p>
        <a href="${link}">Verify</a>
        </div> `;
    // Sending Email To The User
    await sendEmail(user.email,"Verify Your Email",htmlTemplate);



    //Send Response to Client
        
        return  res.status(400)
        .json({message:"We Send To You An Email Please Verify Your Email Address"});

    }


    // 4.Generate Token (jwt)
   
    const token=user.generateAuthToken();
    // 5.response to Client 
   return res.json({id:user._id,
        isAdmin:user.isAdmin,
        profilePhoto:user.profilePhoto,
        token,
        username:user.username,
    });

});


/*----------------------------------------
 * @desc  Verify User Account
 * @router /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 *---------------------------------------- 
 */
module.exports.verifyUserAccountCtrl=asycHandler(async (req,res)=>{
    const user=await User.findById(req.params.userId);
    if(!user){
        return res.status(400).json({message:"invalid link"})
    }
    const verificationToken=await VerificationToken.findOne({
        userId:user._id,
        token:req.params.token,
    });
    if(!verificationToken){
        return res.status(400).json({message:"invalid link"})
    }

    user.isAccountVerified=true;
    await user.save();

    await verificationToken.deleteOne({
        userId:user._id,
        token:req.params.token,
    })

    res.status(200).json({message:"Your Account Verified"})
})