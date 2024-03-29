const router = require('express').Router();
const User = require("../models/User.model")


//GET //users by name
router.get("/user/:name",(req,res,next)=>{
    const {name} = req.params;

    User.findOne({name:name})
    .then((nameOfUser)=>{
        res.json(nameOfUser);
    })
    .catch((e) =>{
        console.log("Error on getting the name of the user");
        console.log(e)
        res.status(500).json({message:"Error getting name of the user"})
        
    });
});
//GET //users by email
router.get("/user/:email",(req,res,next)=>{
    const {email} = req.params;

    User.findOne({email:email})
    .then((emailOfTheUser)=>{
        res.json(emailOfTheUser);
    })
    .catch((e) =>{
        console.log("Error on getting the email of the user");
        console.log(e)
        res.status(500).json({message:"Error getting email of the user"})
        
    });
});

//Get/user/github
router.get("/user/:github",(req,res,next)=>{
    const {github} = req.params;

    User.findOne({github:github})
    .then((githubOfTheUser)=>{
        res.json(githubOfTheUser);
    })
    .catch((e) =>{
        console.log("Error on getting the github of the user");
        console.log(e)
        res.status(500).json({message:"Error getting github of the user"})
        
    });
});
//GET/user/languages
router.get("/user/:langauges",(req,res,next)=>{
    const {langauges} = req.params;

    User.findOne({langauges:langauges})
    .then((programmingLanguages)=>{
        res.json(programmingLanguages);
    })
    .catch((e) =>{
        console.log("Error on getting the programming of the user");
        console.log(e)
        res.status(500).json({message:"Error getting programming of the user"})

    });
});
// GET/user/:userId
router.get("/user/id/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;

     
        console.log("User ID:", userId);

        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(userDetails);
    } catch (e) {
        console.log("Error on getting user details filtering by id");
        console.log(e);
        res.status(500).json({ message: "Error getting user details when filtering by id" });
    }
});

//GET/all users
router.get("/user",(req,res,next)=>{
    
    User.find()
    .then((userFromDB) =>{
        res.json(userFromDB);
    })
    .catch((e)=>{
        console.log("Error getting list of the users");
        console.log(e);
        res.status(500).json({message:"Error getting list of users"})

    });
});


module.exports = router;