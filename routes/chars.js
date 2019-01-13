var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET chars listing. */
router.get('/', function(req, res, next) {
	let chars = getAllChars();
	let response="";
	try {
	  for(let i=0;i< chars.characters.length;i++){
	  	response+= chars.characters[i].name + ",";
	  }
	  console.log(`finish all chars: ${response}`);
	  response = response.substring(0,response.length-1);
	} catch (err) {
	  // Here you get the error when the file was not found,
	  // but you also get any other error
	  console.log(err);
	}

  return res.status(200).json({success:true, data: response});
});

/* GET Char*/
router.get('/:charName', function(req, res, next) {
	let char = getChar(req.params.charName);

	return res.status(200).json({success:true, data: char});
});

/* GET Char HP */
router.get('/:charName/HP', function(req, res, next) {
	let char = getChar(req.params.charName);
	if(char){
		return res.status(200).json({success:true, data: char.HP});
	}
	else{
		charNotFound(res,req.params.charName);
	}
});

/* GET Char Ability (STR,DEX,CON,INT,WIS,CHA) */
router.get('/:charName/Ability/:ability', function(req, res, next) {
	let char = getChar(req.params.charName);
	if(!char){
		charNotFound(res,req.params.charName);
	}
	let ability = getAbility(char, req.params.ability);
	if(!ability){
		abilityNotFound(res,req.params.ability);
	}
	return res.status(200).json({success:true, data: ability.value});
});

/* GET Char Ability (STR,DEX,CON,INT,WIS,CHA) modifier */
router.get('/:charName/Ability/:ability/mod', function(req, res, next) {
	let char = getChar(req.params.charName);
	if(!char){
		charNotFound(res,req.params.charName);
	}
	let ability = getAbility(char, req.params.ability);
	if(!ability){
		abilityNotFound(res,req.params.ability);
	}
	let mod = Math.floor((parseInt(ability.value) - 10)/2);
	if(mod > 0){
		mod = "+" + mod;
	}
	return res.status(200).json({success:true, data: mod});
});

/* GET Char AC */
router.get('/:charName/AC', function(req, res, next) {
	let char = getChar(req.params.charName);
	if(!char){
		charNotFound(res,req.params.charName);
	}
	return res.status(200).json({success:true, data: char.AC});
});

/* GET Char Initiative */
router.get('/:charName/Initiative', function(req, res, next) {
	let char = getChar(req.params.charName);
	if(!char){
		charNotFound(res,req.params.charName);
	}
	return res.status(200).json({success:true, data: char.Initiative});
});

/* GET Char Proeficiency Bonus */
router.get('/:charName/Proeficiency', function(req, res, next) {
	let char = getChar(req.params.charName);
	if(!char){
		charNotFound(res,req.params.charName);
	}
	return res.status(200).json({success:true, data: char.Proeficiency});
});

/* GET Char Hit Die */
router.get('/:charName/HitDie', function(req, res, next) {
	let char = getChar(req.params.charName);
	if(!char){
		charNotFound(res,req.params.charName);
	}
	return res.status(200).json({success:true, data: char.HitDie});
});

module.exports = router;

function getAllChars(){
	console.log("opening chars.json");
	return JSON.parse(fs.readFileSync('./chars/chars.json'));
}

function getChar(name){
	let chars = getAllChars();
	let selectedChar = undefined;
	let i=0;
	console.log(`Looking for ${name}...`);
	while(!selectedChar && i< chars.characters.length)
	{
	  	if(chars.characters[i].name.toLowerCase() == name.toLowerCase()){
	  		selectedChar = chars.characters[i];
	  	}
	  	i++;
	}
	console.log(`Found: ${selectedChar}`);
	return selectedChar;
}

function getAbility(char,ability){
	let slctdAbility = undefined;
	let i=0;
	console.log(`Looking for ${ability} in ${JSON.stringify(char.Abilities)}...`);
	while(!slctdAbility && i< char.Abilities.length)
	{
	  	if(char.Abilities[i].name.toLowerCase() == ability.toLowerCase()){
	  		slctdAbility = char.Abilities[i];
	  	}
	  	i++;
	}
	console.log(`Found: ${slctdAbility}`);
	return slctdAbility;
}

function charNotFound(res,charName){
	return res.status(404).json({success:false,data:`Não foi possível encontrar o personagem ${charName}. Tá certo o nome?`});
}

function abilityNotFound(res,ability){
	return res.status(404).json({success:false,data:`Não foi possível encontrar a habilidade ${ability}. Os valores possíveis são: STR, DEX, CON, INT, WIS e CHA.`});
}