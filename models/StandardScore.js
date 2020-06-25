const mongoose = require('mongoose')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_JWT } = require('../config/config');


const {Schema} = mongoose

const StandardScores = new Schema({
    game: {
        type: String, 
        required: true,
        default: "multiplication"
    },
    time: {
        type: String, 
        required: true,
        default: "5 min"
    },
    resultGood: {
       type: Number, 
       required: true,
       default: 0
   },
   resultWrong: {
       type: Number, 
       required: false,
       default: 0
   },
    date: {
       type: Date, 
       required: true,
       default: Date.now()
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    autopopulate: { maxDepth: 2 }
},
   
}) 


 
StandardScores.plugin(require('mongoose-unique-validator'));
StandardScores.plugin(require('mongoose-autopopulate'));

 module.exports = mongoose.model('StandardScores', StandardScores);

 
