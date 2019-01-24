# ApiRPG
A Rest API to help on my Telegram async RPG.

## Characters
As for now all characters need to be added manually to the chars.json file in chars folder, just copy and paste the one that is already there. Bear in mind that it should be one element of the characters array.

## Routes
### Get char List
`v1/chars` - This will list all characters in the chars.json

### Get char
`v1/chars/:charName` - This will return the whole char information. `charName` should be a name contained in the characters array in chars.json.

### Get char HP
`v1/chars/:charName/HP` - Returns a char's HP.

### Get char AC
`v1/chars/:charName/AC` - returns a char's AC.

### Get char initiative
`v1/chars/:charName/Initiative` - returns a char's initiative.

### Get char Proeficiency Bonus
`v1/chars/:charName/Proeficiency`

### Get char Hit Die
`v1/chars/:charName/Hitdie`

### Get char ability
`v1/chars/:charName/Ability/:ability` -  Returns a char's ability value. `ability` should be one of the following:
* STR
* DEX
* CON
* INT
* WIS
* CHA

### Get char ability's modifier
`v1/chars/:charName/Ability/:ability/mod` -  Returns a char's ability value.

### Roll
`v1/roll?dice - Return a roll. Use RPG dice notation, eg: 1d20+6. Modifiers are not mandatory. Don't forget to escape the mod sign
