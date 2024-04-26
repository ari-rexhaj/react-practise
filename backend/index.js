const express = require("express");
const bodyParser = require("body-parser");
const {Client} = require("pg");
const EventEmitter = require("events")
const app = express();

const port = process.env.PORT || 3001;
const myEmitter = new EventEmitter();

myEmitter.on("error",(err) => {
    console.error("an Error occoured:",err)
})

app.use(
    bodyParser.json(),
    function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const client = new Client({
    host: "dpg-coj187gl5elc73dffv70-a.frankfurt-postgres.render.com",
    user: "ari_db_user",
    port: "5432",
    password: "uvnjcba54RGfTnu9xPyX2qiS1X2qdrhv",
    database: "ari_db",
    ssl: true
});

client.connect();
app.listen(port, () =>  {
    console.log(`Attempting startup at port ${port}`);
});

function isNumber(x, noStr) {
    return (
        (typeof x === 'number' || x instanceof Number || (!noStr && x && typeof x === 'string' && !isNaN(x))) &&
        isFinite(x)
    ) || false;
};

function sortByDate(rowlist) {
//im sure there are better methods for doing this, but i wanted to
//attempt sorting the dates on my own, even though i did indeed need
//to read up on how to sort the hashmap and such.
let map = new Map()
//start looping over response.rows
for(let i = 0; i < rowlist.length; i++) {
    //split the date string into a list which containts the strings
    //that represent day, month and year respectively
    let dateinfo = rowlist[i]["date"].split("-")
    //we do some math to get the exact day of the post formatted as 
    //total days since the first day in our time system 
    //(turns into number of days since the date 00/00/0000)
    let time = parseInt(dateinfo[0]) + (parseInt(dateinfo[1]) * 30) + (parseInt(dateinfo[2] * 365))
    //put into a hashmap where the key is the current row we are 
    //working with and the value is the earlier calculated day
    map.set(rowlist[i],time)
}
//sort the hashmap based on the value
let newmap = new Map([...map.entries()].sort((a,b) => b[1] - a[1]))
//send the keys of the hashmap (remember this was the rows)
//as a list to the caller
return [...newmap.keys()]
}

//APIs need to be foolproof because I HOLD MYSELF TO HIGH STANDARDS (idk if its foolproof)
// if you can SQL inject than thats just a L, i know what it is, i dont know how to do anything about it,
// and ill probably learn how to not get fucked later, for now it does not matter

app.get("/Status", async (req,res) => {
    console.log("\nStatus called",new Date())
    res.send({"status":"GOOD"})
})

//make a get posts (GET)
app.get("/getPosts", async (req,res) => {
    console.log("\ngetPosts called",new Date())

    client.query("SELECT * FROM posts", (error, response) => {
        if (!error) {
            res.send(sortByDate(response.rows))
            console.log("getPosts success")
        }
        else {
            console.log("getPosts fail")
            res.status(500).json({ success: false, message: "Error getting posts" });
        }
    })
});

//not case sensitive
//lets you search for text (really only title and tags in this case) where
// you will by default search for titles and can choose to include tags or
//not with the 'includetags' bool
app.get("/searchPostsByText/:includetags", async (req,res) => {
    console.log("\nsearchPostsByText called",new Date())
    //fetch the search that the user inputted
    let substring = req.body["search"].toLowerCase();
    //variable for if the user would like to include tags in the search results
    let includetags = req.params.includetags

    //first just give me all of the results (probably not a good implementation for real projects)
    client.query('SELECT * FROM posts', (error,result) => {
        
        if (!error) {
            let matchList = []; //list of matches
            let postList = result.rows;
        
            //loops over all the posts, checking if it includes the search that the user inputted.
            //if the user also wants to include tags results, it will check for an identicial match to the tag name
            for (let i = 0; i < postList.length; i++) {
                if (postList[i]["title"].toLowerCase().includes(substring) || (includetags === "true" && postList[i]["tag"].toLowerCase() == substring)) {
                    matchList.push(postList[i])
                }
            }
            
            //sends a list of all matches
            console.log("searchPostsByText success");
            res.send(sortByDate(matchList))
        }
        else {
            console.log("searchPostsByText failed")
            res.json({success:false,message:"Error searching for posts"})
        }
    })
});

//adds a post to the database, I think if you do not format the request body
//correctly you will end up with undefined, soooooooo.... DO IT RIGHT
app.post("/addPost", async (req,res) => {
    console.log("\naddPost called",new Date());
    //preparing the variables
    let data = req.body;
    let date = data["date"]
    let tag = data["tag"]
    let title = data["title"]
    let img = data["thumbnail"]
    client.query('INSERT INTO posts (date, tag, title,thumbnail) VALUES ($1, $2, $3, $4) RETURNING id', [date, tag, title, img], (error, result) => {
        if (!error) {
            console.log("addPost success");
            const insertedId = result.rows[0].id;
            res.json({ success: true, message: "Post added successfully", insertedId });
        } else {
            console.log("addPost failed at inserting new post");
            res.status(500).json({ success: false, message: "Error adding post" });
        }
    });
})

//make a get posts for given type and index (GET)
//to explain it nice and short, the query doesnt want quatation marks 
//when refering to a column (can be thought of as key aswell) in the database, 
//(i.e tag,date,id,title), but it does want the quotation marks when refering to
//the index (ie. the value in the key-value pair), so ive written it to add the
//type value into the string with + to remove the qoutation marks, and when 
//adding the index i do it using the $ to add in the quotation marks. Which works
//for seemingly all cases
app.get("/getSpecificPosts/:type/:index", async (req,res) => {
    console.log("\ngetSpecificPosts called",new Date());
    let type = req.params.type
    let index = req.params.index
        
    // if you are wondering whats going on under this comment, let me break it down: https://i.pinimg.com/originals/7a/56/4c/7a564cac06f9b1a48491d8c72b10b0fd.gif
    client.query('SELECT * FROM posts WHERE '+type+' = $1',[index],(error,result) => {
        if(!error && result.rows.length !== 0) {
            res.send(sortByDate(result.rows));
            console.log("getSpecificPosts success")
        }
        else {
            res.status(500).json({ success: false, message: "error getting filtered posts, did you correctly address the API?" });
            console.log("getSpecificPosts failed")
        }
    })
})

//make a update entire post (PUT)
//dont know why but this feels like a bad way to do it, but it does work. 
//Maybe its because theres no checks making sure the formatting is correct, 
//the API plugs the values in without thought.
app.put("/updatePost/:id", async (req,res) => {
    console.log("\nupdatePost called",new Date());
    //saves the different variables, this is very unstable since you can write whatever you want as the value to these things
    let data = req.body
    let date = data["date"]
    let tag = data["tag"]
    let title = data["title"]
    let img = data["thumbnail"]
    let id = req.params.id;

    if (data == undefined || date == undefined || tag == undefined || title == undefined || img == undefined) {
        console.log("updatePost failed due to undefined data, did you format the request correctly?")
        res.status(500).json({ success: false, message: "error updating post, did you format the body correctly? Remember to define a date, tag, title and image url" });
        return
    }

    client.query('UPDATE posts SET date = $1, tag = $2, title = $3, thumbnail = $4 WHERE id = $5',[date,tag,title,img,id], (error, result) => {
        if (!error) {
            console.log("updatePost success")
            res.json({ success: true, message: "Post updated successfully"});
        }
        else {
            console.log("updatePost failed, data received below\n",data)
            res.status(500).json({ success: false, message: "error updating post" });
        }
    })

});

//make a update value of post variable (PATCH)
//works pretty well, will only update the given tag and index, does not 
//support multiple values atm, because im not THAT good yet
app.patch("/updatePostValue/:id", async (req,res) => {
    console.log("\nupdatePostValue called",new Date());
    let id = req.params.id;
    let data = JSON.stringify(req.body);
    data = data.replace("{","").replace("}","").replaceAll('"','').split(/:(.*)/s)   //some data parcing, converts the json into an array with the tag and the index

    //querying, doing it the same way as always although im not sure if its neccessary here. BUT IF IT WORKS; DONT TOUCH IT!
    //we are saying update the given Key-value (where data[0] refers to the key) with the given index (where data[1] refers to the value) for post with the given id, incase youre curious
    client.query('UPDATE posts SET '+data[0]+' = $1 WHERE id = $2',[data[1],id], (error,result) => {
        if (!error) {
            console.log("updatePostValue success")
            res.json({ success: true, message: "Post value updated successfully"});
        }
        else {
            console.log("updatePostValue failed, data received below\n",data)
            res.status(500).json({ success: false, message: "error updating post value" });
        }
    })
});

//WORKS, but deleting a post will make that a hole in the id counting as 
//that post id will never be used again thanks to earlier systems, although 
//this is not a big deal, my OCD does not enjoy this
app.delete("/deletePost/:id", async (req,res) => {
    console.log("\ndeletePost called",new Date())
    let id = req.params.id

    if (!isNumber(id)) {
        console.log("deletePost failed, id was not a number")
        return
    }

    client.query('DELETE FROM posts WHERE id = $1',[id], (error,result) => {
        if (!error) {
            console.log("deletePost success")
            res.json({success:true,message:"If post with given id existed, it was deleted successfully"})
        }
        else {
            console.log("deletePost failed")
            res.status(500).json({success:false,message:"Failed to delete post"})
        }
    })
})
