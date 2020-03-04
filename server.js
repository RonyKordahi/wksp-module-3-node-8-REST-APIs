'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {words} = require("./data/words");

const PORT = process.env.PORT || 8000;

const getWord = (req, res) => {
    const random = Math.floor(Math.random() * words.length);
    res.send({id: words[random].id, letterCount: words[random].letterCount})
}

const checkGuess = (req, res) => {
    let lettersArray = [];

    words.forEach(word => {
        
        if(word.id == req.params.wordId) {
            
            lettersArray = word.word.split("");
        }
    })
    
    const booleanArray = lettersArray.map(letter => letter === req.params.letter);
    res.send(booleanArray);
}

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))

    // endpoints
    .get("/hangman/words", getWord)
    .get("/hangman/guess/:wordId/:letter", checkGuess)

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));