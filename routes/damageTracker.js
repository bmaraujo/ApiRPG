const express = require('express');
const redis = require('redis');

const router = express.Router();

const DAMAGE_KEY = "$0_damage";

let redOption = {
	url: process.env.redisUrl,
	password : process.env.redisPass
}

const redClient = redis.createClient(redOption);
console.log(`client is ${redClient}`);

// GET - Returns charName health and damage
router.get('/:charName/hit', function(req,res){

	return updateHealth(parseInt(req.query.amount),req.params.charName,res);
});

router.get('/:charName/heal', function(req,res){

	return updateHealth(parseInt(req.query.amount)*-1,req.params.charName,res);

});

module.exports = router;

function updateHealth(amount, charName,res){

	console.log(`amt:${amount}`);

	let damageKey = DAMAGE_KEY.replace("$0",charName);

	console.log(`damageKey:${damageKey}`);

	let total=0;

	// This will return a JavaScript String
	redClient.get(damageKey, function (err, reply) {

		if(err){
			console.log(`Erro ao buscar ${damageKey}: ${err}`);
			return res.status(500).json({success:false,data:err});
		}

		console.log(`reply:${reply}`);

		//if there is damage tracker, update
		if(reply && !isNaN(reply)){
			console.log(`adding ${reply} from Redis...`);
			total = parseInt(reply);
		}
		console.log(`total before amt: ${total}`);

		total += parseInt(amount);

		console.log(`totalDmg:${total}`);

		if(total < 0){ //total should never be less than 0, so delete the entry
			console.log(`deleting Redis entry ${damageKey}`);
			redClient.del(damageKey);
		}
		else{
			console.log(`setting Redis entry ${damageKey} with value of ${total}`);
		    //Update redis
		    redClient.set(damageKey, total);
		}

	    return res.status(200).json({success:true, data: total});
	});
}