const express = require('express');
const redis = require('redis');

const router = express.Router();

const DAMAGE_KEY = "$0_damage";

let redOption = {
	url: process.env.redisUrl || 'redis://redis-19127.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:19127',
	password : process.env.redisPass || 'zm5RChtNXsZOpKlPUm6RkSN80d3wLqZd'
}

const redClient = redis.createClient(redOption);


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

		console.log(`reply:${reply}`);

		//if there is damage tracker, update
		if(reply){
			total = parseInt(reply);
		}

		total += amount;

		console.log(`totalDmg:${total}`);

	    //Update redis
	    redClient.set(damageKey, total);

	    return res.status(200).json({success:true, data: total});
	});
}