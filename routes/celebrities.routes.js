const Celebrity = require("../models/Celebrity.model")
const router = require("express").Router();

// all your routes here

router.get("/celebrities/create", (req, res, next)=>{
    res.render("celebrities/new-celebrity");
})

router.post("/celebrities/create", (req, res, next)=>{
    Celebrity.create(req.body)
    .then(result =>{
        res.redirect("/celebrities")
    })
    .catch(err =>{
        res.render("celebrities/new-celebrity")
    })
})

router.get("/celebrities", (req, res, next)=>{
    Celebrity.find()
    .then(result =>{
        // const data = {celebrity: result}
        res.render("celebrities/celebrities", {celebrity: result});
    })
    .catch(err =>{
        console.log(err);
    })
})








module.exports = router;