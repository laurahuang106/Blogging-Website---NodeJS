const express = require("express")

const app = express()

app.set('view engine', 'ejs')

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {title: "Blogs"})
})

app.get("/about", (req, res) => {
    res.render("about.ejs",  {title: "About"})
})

app.get("/create", (req, res) => {
    res.render("create.ejs",  {title: "Create blog"})
})

app.listen(3000)
