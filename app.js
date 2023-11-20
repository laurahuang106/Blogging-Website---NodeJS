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
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

// mongoose and mongo routes
// create a blog
app.get('/create', (req, res) => {
    res.render('create', {'title': 'Create a new blog'})
})

// display all blogs
app.get("/", (req, res) => {
    Blog.find()
    .then(result =>{
        res.render("index", {title: 'All Blogs', blogs: result})
    })
    .catch(err => {
        console.log(err)
    })
})

// save new blog to database
app.post("/", (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
    .then((result) => {
        res.redirect("/")
    })
    .catch((err) => {
        console.log(err)
    })
})

// display a particular blog
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id)
    .then(result =>{
        res.render("details", {title: 'Blog Details', blog: result})
    })
    .catch(err => {
        console.log(err)
    })
})

// delete a particular blog
app.post("/blogs/delete/:id", (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/');
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs",  {title: "About"})
})



