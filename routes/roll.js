const express = require('express');

const router = express.Router();


router.get('/', function(req, res, next){
    
	let rpgDice = req.query.dice;

	let posD = rpgDice.indexOf('d');
    let qtdDados = rpgDice.substring(0,posD);
    let posMod = rpgDice.indexOf("+");
    if(posMod <0){
        posMod = rpgDice.indexOf("-");
    }
    let qtdLados = 0;
    let modificador = 0;
    if(posMod >=0){
    	qtdLados = rpgDice.substring(posD+1,posMod);
        modificador = rpgDice.substring(posMod);
    }
    else{
    	qtdLados = rpgDice.substring(posD+1);
    }

    let resposta = {total:"0",dados:[]};
    let total =0;
    for(let i=0;i<qtdDados; i++){
        let roll = Math.ceil(Math.random() * qtdLados);
        total += roll;
        resposta.dados.push(roll);
    }
    
    if(modificador){
    	total +=  parseInt(modificador);
    }
    
    resposta.total = total;

    return res.status(200).json({success:true, data: resposta});
});

module.exports = router;