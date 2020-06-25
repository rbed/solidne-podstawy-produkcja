/*
* TODO:
*   - przesunąć routing logiki biznesowej do API
*
* wszystkie paczki API powrzucaj tutaj
* dzieki temu bedziesz mial jedna nadrzedna sciezke API do zarządzenia
* cos w rodzaju dodatkowego routera :) 
*/
var express = require("express");
var router = express.Router();

//   Employees API info path

var usersRouter = require('./users');
var scoresRouter = require('./standardScore');


router.use('/users', usersRouter);
router.use('/scores', scoresRouter);


module.exports = router;
