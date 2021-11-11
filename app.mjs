
// import cookieParser from "cookie-parser"
import express from 'express'
import mongoose from "mongoose"
import cors from "cors"
import path from "path";
const __dirname = path.resolve();

import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const SECRET = process.env.SECRET || "12345"
const PORT = process.env.PORT || 5000
const app = express()

// app.use(cors(["localhost:5000", "localhost:3000"]))

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'web/build')))

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
})


// mongoose.connect("mongodb+srv://ahsan:form123@users.rpo2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mongoose.connect(`mongodb://abdurrehman:Disccompact890@cluster0-shard-00-00.7d9p9.mongodb.net:27017,cluster0-shard-00-01.7d9p9.mongodb.net:27017,cluster0-shard-00-02.7d9p9.mongodb.net:27017/users?ssl=true&replicaSet=atlas-wpbp4z-shard-0&authSource=admin&retryWrites=true&w=majority`)
.then(res => console.log("Connected to DB"))
const User = mongoose.model('User', {
    name: String,
    lastName: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
});




const Post = mongoose.model("Post", {
    postText: String,
    description: String,
    userId: String,
    name: String,
    email: String,
    description: String,
}) 


app.post('/api/v1/login', (req, res) => {
    // const email = req.body.email;
    // const password = req.body.password;


    if (!req.body.email || !req.body.password) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }

    console.log(req.body)

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                varifyHash(req.body.password, user.password).then(result => {
                    if (result) {

                        var token = jwt.sign({
                            name: user.name,
                            email: user.email,
                            lastName:user.lastName,
                            _id: user._id,
                        }, SECRET);
                        console.log("token created: ", token);

                        res.cookie("token", token, {
                            httpOnly: true,
                            maxAge: 300000 //5 mins
                        });

                        res.send({
                            name: user.name,
                            email: user.email,
                            lastName:user.lastName,
                            _id: user._id,
                        });
                    } else {
                        res.status(401).send("Authentication fail");
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.send("user not found");
            }
        }
    })
})

app.post('/api/v1/signup', (req, res) => {

    if (!req.body.email ||
         !req.body.password ||
          !req.body.name 
          ) {
        console.log("required field missing");
        
        res.status(403).send("required field missing");
        return;
    } 
    
    else{
        User.findOne({ email: req.body.email }, (err, user) => {

            if (user) {
              
                res.send("user already exist")
                alert("user already exist")
            }
            else {
                User.findOne({ email: req.body.email }, (err, user) => {
                    if (user) {
                       
                        res.send("user already exist");
                        alert("user already exist")
                    } else {
                        console.log(req.body)
        
                        stringToHash(req.body.password).then(passwordHash => {
                            console.log("hash: ", passwordHash);
        
                            let newUser = new User({
                                name: req.body.name,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: passwordHash,
                            })
                            newUser.save(() => {
                                console.log("data saved")
                                res.send('signup success')
                            })
                        })
                    }
                })

            }
        })
    }
})


app.use((req, res, next) => {

    jwt.verify(req.cookies.token, SECRET,
        function (err, decoded) {

            req.body._decoded = decoded;

            console.log("decoded: ", decoded)

            if (!err) {
                next();
            } else {
                res.status(401).sendFile(path.join(__dirname, "./web/build/index.html"))
            }

        })

});


app.post('/api/v1/logout', (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 300000
    });
    res.send();
})



app.get('/api/v1/profile', (req, res) => {
    User.findOne({ email: req.body._decoded.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {
                res.send({
                    name: user.name,
                    email: user.email,
                   lastName:user.lastName,
                    _id: user._id,
                });
            } else {
                res.send("user not found");
            }
        }
    })
})

app.post('/api/v1/profile', (req, res) => {
    res.send('profile created')
})
app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})


// only for single post 

app.post('/api/v1/post', (req, res) => {
const newPost  = new Post ({
    postText : req.body.postText,
    description: req.body.description,
    userId: req.body._decoded._id,
    name: req.body._decoded.name,
    email: req.body._decoded.email,
    
})
newPost.save().then(() => {
    console.log("Data Saved in MondoDB");
    res.send("Data Saved in MondoDB");
});
});
    // if (!req.body.name || !req.body.caption) {
    //     console.log("required field missing");
    //     res.status(403).send("required field missing");
    //     return;
    // } 
    
//     else {

//         let newPost = new Post({
//             name: req.body.name,
//             caption: req.body.caption,
//             email: req.body.email
//         });


//         newPost.save(() => {
//             console.log("Data Saved in MondoDB")
//             res.send('Data Saved in MondoDB')
//         }
//         )

//     }

// })

app.delete("/api/v1/post", (req, res) => {
    Post.deleteOne({ _id: req.body.id, userId: req.body._decoded._id }, (err, data) => {
        res.send("Post deleted");
    });
});

app.put("/api/v1/post", (req, res) => {
    Post.updateOne({
        _id: req.body.id,
        userId: req.body._decoded._id
    }, {
        postText: req.body.postText

    }, (err, data) => {
        res.send("Post deleted");
    });
});

// for multiple posts

app.get("/api/v1/posts", (req, res) => {

    const page = Number(req.query.page);

    console.log("page: ", page);

    Post.find({})
        .sort({ created: "desc" })
        .skip(page)
        .limit(15)
        .exec(function (err, data) {
            res.send(data);
        });
});




app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
    // res.redirect("/")
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})