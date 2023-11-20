require('dotenv').config()
const morgan = require('morgan');
const express = require("express")
const mongoose = require("mongoose")
const Blog = require("./models/blog")

const app = express()
const db = process.env.db
mongoose.connect(db)
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error))

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static("public"));
app.use(morgan('dev'))

// mongoose and mongo routes
// create a blog
app.get('/create', (req, res) => {
    const blog = new Blog({
        title: 'new blog 22',
        body: 'more about my new blog 22'
      })
    
    blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
})

// find all blogs
app.get("/", (req, res) => {
    Blog.find()
    .then(result =>{
        res.render("index", {title: 'All Blogs', blogs: result})
    })
    .catch(err => {
        console.log(err)
    })
})


app.get("/about", (req, res) => {
    res.render("about.ejs",  {title: "About"})
})

app.get("/create", (req, res) => {
    res.render("create.ejs",  {title: "Create blog"})
})


