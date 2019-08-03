const express = require('express');
const fs = require('fs');
var firebase = require("firebase/app");

require("firebase/database");

const router = express.Router();

var firebaseConfig = {
  apiKey: process.env.firebaseAppKey,
  authDomain: "",
  databaseURL: "https://bmarpgapi.firebaseio.com/",
  projectId: "bmarpgapi",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

/* POST char */
router.post('/', function(req,res){
	let request = req.body;
	writeCharData(request.userId, request.name,request);
	return res.status(200).json({success:true});
});

/* GET Char*/
router.get('/:userId/:charName', function(req, res, next) {

	database.ref(req.params.userId + "/chars/" + req.params.charName).once('value').then(function(snapshot) {
	  	console.log(JSON.stringify(snapshot));
	  	let char = snapshot;

	  	if(char){
			return res.status(200).json({success:true, data: char});
		}

		return res.status(404).json();
	  });
});

/* GET Char for the user*/
router.get('/:userId/', function(req, res, next) {

	database.ref(req.params.userId + "/chars/").once('value').then(function(snapshot) {
	  	console.log(JSON.stringify(snapshot));
	  	let char = snapshot;

	  	if(char){
			return res.status(200).json({success:true, data: char});
		}

		return res.status(404).json();
	  });
});


module.exports = router;


function writeCharData(userId, charName, data) {
  database.ref(userId + "/chars/" + charName).set(data);
}

function readCharData(userId, charName){
  let char = undefined;
  char = database.ref(userId + "/chars/" + charName).once('value').then(function(snapshot) {
  	console.log(JSON.stringify(snapshot));
  	char = snapshot;
  });
}

function charNotFound(res,charName){
	return res.status(404).json({success:false,data:`Não foi possível encontrar o personagem ${charName}. Tá certo o nome?`});
}

function abilityNotFound(res,ability){
	return res.status(404).json({success:false,data:`Não foi possível encontrar a habilidade ${ability}. Os valores possíveis são: STR, DEX, CON, INT, WIS e CHA.`});
}