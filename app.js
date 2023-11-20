require('dotenv').config()
const morgan = require('morgan');
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const db = process.env.db
mongoose.connect(db)
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error))

// register view engine
app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use(morgan('dev'))


// routes
app.get("/", (req, res) => {
    res.render("index.ejs", {title: "Blogs"})
})

app.get("/about", (req, res) => {
    res.render("about.ejs",  {title: "About"})
})

app.get("/create", (req, res) => {
    res.render("create.ejs",  {title: "Create blog"})
})


