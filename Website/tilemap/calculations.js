const mainCollisionsMap = []
const mainBoundaries = []
const plantablesMap = []
const plantables = []
const bookStoreMap = []
const bookstoreCollisions = []
const mainCharacterMap = []
const mainCharacters = []

const mainMapImage = new Image()
mainMapImage.src = "./assets/Maps/pngs/mainMap.png"

const bookStoreImage = new Image()
bookStoreImage.src = "./assets/Maps/pngs/bookstore.png"

const playerUp = new Image()
playerUp.src = "./assets/Characters/Player/up.png"

const playerDown = new Image()
playerDown.src = "./assets/Characters/Player/down.png"

const playerLeft = new Image()
playerLeft.src = "./assets/Characters/Player/left.png"

const playerRight = new Image()
playerRight.src = "./assets/Characters/Player/right.png"

const NPCr = new Image()
NPCr.src = "./assets/Characters/BlueSamurai/Idle.png"

for (let i = 0; i < collisions.length; i += 250) mainCollisionsMap.push(collisions.slice(i, i + 250))
mainCollisionsMap.forEach((row, i) => {
	row.forEach((element, j) => {
		if (element === 12545) mainBoundaries.push(new Boundary(j * 8 - 873, i * 8 - 525, true))
	})
})

for (let i = 0; i < plantablesData.length; i += 250) plantablesMap.push(plantablesData.slice(i, i + 250))
plantablesMap.forEach((row, i) => {
	row.forEach((element, j) => {
		if (element === 12545) plantables.push(new Boundary(j * 8 - 873, i * 8 - 525))
	})
})

for (let i = 0; i < bookStoreData.length; i += 60) bookStoreMap.push(bookStoreData.slice(i, i + 60))
bookStoreMap.forEach((row, i) => {
	row.forEach((element, j) => {
		if (element === 3845) bookstoreCollisions.push(new Boundary(j * 8 - 92, i * 8 - 70, true))
	})
})

for (let i = 0; i < mainCharacterData.length; i += 250) mainCharacterMap.push(mainCharacterData.slice(i, i + 250))

mainCharacterMap.forEach((row, i) => {
	row.forEach((element, j) => {
		if (element === 1026) mainCharacters.push(new NPC(
			(j * 8) - 873, (i * 8) - 525, {max: 4, elapseTiming: 200}, NPCr, 16, 16, [], 0, 0, welcomerTalk, true
		))
	})
})