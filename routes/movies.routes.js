// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
const router = require("express").Router();

// all your routes here
router.get("/movies/create", (req, res, next)=>{
    Celebrity.find()
    .then(dbcelebrities =>{
        res.render("movies/new-movie", {dbcelebrities});
    })
    .catch(err =>{
        console.log(err);
    })
})


router.post("/movies/create", (req, res, next)=>{
    Movie.create(req.body)
    .then(result =>{
        res.redirect("/movies")
    })
    .catch(err =>{
        res.render("movies/new-movie")
    })
})

router.get("/movies", (req, res, next)=>{
    Movie.find()
    .then(result =>{
        res.render("movies/movies", {movie: result});
    })
    .catch(err =>{
        console.log(err);
    })
})

router.get("/movies/:id", (req, res, next)=>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then(result =>{
        res.render("movies/movie-details", {movie: result})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post("/movies/:id/delete", (req, res, next)=>{
    Movie.findByIdAndRemove(req.params.id)
    .then(result =>{
        res.redirect("/movies")
    })
    .catch(err =>{
        console.log(err)
    })
})

router.get("/movies/:id/edit", (req, res, next)=>{
    Movie.findById(req.params.id)
    .then(result =>{
        Celebrity.find()
        .then(dbcelebrities=>{
            res.render("movies/edit-movie", {movie: result, celebrity: dbcelebrities })
        })
    })
    .catch(err =>{
        console.log(err)
    })
})

module.exports = router;