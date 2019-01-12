# ApiRPG
A Rest API to help on my Telegram async RPG.

## Characters
As for now all characters need to be added manually to the chars.json file in chars folder, just copy and paste the one that is already there. Bear in mind that it should be one element of the characters array.

## Routes
### Get char List
`/chars` - This will list all characters in the chars.json

### Get char
`/chars/:charName` - This will return the whole char information. `charName` should be a name contained in the characters array in chars.json.

### Get char HP
`/chars/:charName/HP` - Returns a char's HP.

### Get char AC
`/chars/:charName/AC` - returns a char's AC.

### Get char initiative
`/chars/:charName/Initiative` - returns a char's initiative.

### Get char Proeficiency Bonus
`/chars/:charName/Proeficiency`

### Get char Hit Die
`/chars/:charName/Hitdie`

### Get char ability
`/chars/:charName/Ability/:ability` -  Returns a char's ability value. `ability` should be one of the following:
* STR
* DEX
* CON
* INT
* WIS
* CHA

### Get char ability's modifier
`/chars/:charName/Ability/:ability/mod` -  Returns a char's ability value.
