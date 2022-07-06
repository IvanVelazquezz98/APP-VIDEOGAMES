const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const videogameRoute = require("./videogames");
const genresRoute = require("./genres");

router.use("/videogames" , videogameRoute)
router.use("/genres" , genresRoute)
module.exports = router;
