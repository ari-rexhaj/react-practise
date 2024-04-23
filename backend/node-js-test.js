const express = require("express");
const bodyParser = require("body-parser")
const {Client} = require("pg")
const app = express();
const dbUrl = "postgres://ari_db_user:uvnjcba54RGfTnu9xPyX2qiS1X2qdrhv@dpg-coj187gl5elc73dffv70-a.frankfurt-postgres.render.com/ari_db"
                                                                     /*dpg-coj187gl5elc73dffv70-a.frankfurt-postgres.render.com*/
                                                                     /*!! The second above this comment is the host REMEMBER !!*/
app.use(bodyParser.json());

const client = new Client({
    host: "dpg-coj187gl5elc73dffv70-a.frankfurt-postgres.render.com",
    user: "ari_db_user",
    port: "5432",
    password: "uvnjcba54RGfTnu9xPyX2qiS1X2qdrhv",
    database: "ari_db",
    ssl: true
})

client.connect();

let posts = []

client.query("TABLE posts", (error,response) => {
    if (!error) {
        console.log("data from db aquired")
        posts = response.rows
    }
    else {
        console.log("data from db failed to be aquired")
    }
    client.end;
})
// incase ive sendt you this file to show my progress, I KNOW THE CODE IS ASS
// this code is NOT the kind of code i would write in a proper project
// ive written it to be INCREDIBLY bare bones so i have a good grasp of how it
// all works, but it is not made AT ALL to be actually used for anything other
// than practise, so please, when you cringe at the code, just remember this comment

const port = process.env.PORT || 3004;

app.listen(port, () =>  {
    console.log(`Server port is ${port}`);
});

//was the first api i wrote so its very useless
app.get("/status", (req, res) => {
    const status = {
        "Status":"Good"
    }

    res.send(status)
});

//used to add a new post, ID is generated automatically based on length the database... if you could call it that
app.post("/addpost", (req,res) => {

    let data = req.body;
    let new_post = {
        "id":posts.length,
        "date":data["date"], // if this was a real project, the date would be automatically set and id have a system for parsing and stuff
        "tag":data["tag"],
        "title":data["title"]
    }

    posts.push(new_post)

    res.send({
        "message":"added new post, appearently",
        "new_post": new_post,
    })
});

//used to update an entire post, not allowing to change the ID tho
app.put("/updatepost/:id", (req,res) => {
    let id = req.params.id;
    let data = req.body;

    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["id"] == id) {
            posts[i]["date"] = data["date"];
            posts[i]["tag"] = data["tag"];
            posts[i]["title"] = data["title"];
        }
    }

    res.send({
        message:`Updated post with id ${id}, but you already knew that considering you used the id to update it...`
    })
}) 

//used to get all posts in the database
app.get("/getposts", (req,res) => {
    res.send(posts)
})

//used to get all posts with given ID, although it should always return just 1 post since every post has a unique ID, the code is written to return ALL posts with given ID
app.get("/getpostsfromID/:id", (req,res) => {
    let id = req.params.id;
    let filteredPosts = []
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["id"] == id) {
            filteredPosts.push(posts[i])
        }
    }
    res.send(filteredPosts)
})

//used to get all posts with given tag, probably the most useful api ive written so far
app.get("/getpostsfromtag/:tag", (req,res) => {
    let tag = req.params.tag;
    let filteredPosts = []
    
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["tag"] == tag) {
            filteredPosts.push(posts[i])
        }
    }
    res.send(filteredPosts)
})

app.patch("/updateposttitle/:id", (req,res) => {
    let newTitle = req.body["new title"];
    let id = req.params.id;

    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["id"] == id) {
            posts[i]["title"] = newTitle;
        }
    }

    res.send({
        "message":"updated post title, perchance"
    })
})