var dialogueInterval;
class Sprite {
	constructor(x, y, frames = { max: 1, elapseTiming: 200}, image, setWidth, setHeight, sprites = [], velocityX, velocityY, moving = false) {
		this.x = x
		this.y = y
		this.velocityX = velocityX
		this.velocityY = velocityY
		this.lastX = 0
		this.lastY = 0
		this.setWidth = setWidth
		this.setHeight = setHeight
		this.frames = {...frames, val: 0, elapsed: 0}
		this.image = image
		this.image.onload = () => {
			this.width = this.image.width / this.frames.max
			this.height = this.image.height
		}
		this.sprites = sprites
		this.moving = moving
		this.isInteracting = false
	}

	draw() {
		c.drawImage(
			this.image,
			this.frames.val * this.width,
			0,
			this.image.width / this.frames.max,
			this.image.height,
			this.x,
			this.y,
			this.setWidth,
			this.setHeight,
		)
		if (!this.moving) return
			
		if (this.frames.max > 1) this.frames.elapsed++
		if (this.frames.elapsed % this.frames.elapseTiming === 0) {
			if (this.frames.val < this.frames.max - 1) this.frames.val++
			else this.frames.val = 0
		}
		}
}

class NPC extends Sprite {
	constructor(x, y, frames = { max: 1, elapseTiming: 60}, image, setWidth, setHeight, sprites = [], velocityX, velocityY, dialogue = [], moving) {
		super(x, y, frames, image, setWidth, setHeight, sprites, velocityX, velocityY, moving)
		this.dialogue = dialogue
		this.dialogueIndex = 0
		this.letterIndex = 0
	}
}

class Boundary {
	constructor(x, y, visible = false, width = 8, height = 8,  seedsImg = "", resultImg = "") {
		this.x = x
		this.y = y
		this.visible = visible
		this.width = width
		this.height = height
		this.selected = false
		this.ready = false
		this.seedsImg = new Image()
		this.resultImg = new Image()
		this.seedsImg.src = seedsImg
		this.resultImg.src = resultImg
	}

	draw() {
		if (this.selected == true) {
			c.strokeStyle = "rgb(255, 255, 255, 1)"
			c.lineWidth = 0.5
			c.strokeRect(this.x, this.y, this.width, this.height)
		}
		if (this.ready) c.drawImage(this.resultImg, this.x, this.y)
		else c.drawImage(this.seedsImg, this.x, this.y)
		c.fillStyle = "red"
		if (this.visible) c.fillRect(this.x, this.y, this.width, this.height)
	}

	reward() {}
}

class Game {
	// Constructor
	constructor(JSONFILE) {
		this.JSONFILE = typeof JSONFILE === "object" ? JSONFILE : {}
		this.tutorial = false
		this.isOngoing = true
		this.switching = false
		this.bookstore = {
			access: false,
			enter: {
				xMin: -1450,
				xMax: -1420,
				yMax: -270,
				yMin: -280,
			},
			exit: {
				xMin: -105,
				xMax: -75,
				yMin: -65,
				yMax: -70,
			},
		}
		this.stats = {
			talkSpeed: 25,
			level: 0,
			xp: 0,
			xpMax: 15,
			food: {
				apple: {
					discovered: false,
					count: 0,
				},
				beef: {
					discovered: false,
					count: 0,
				},
				fish: {
					discovered: false,
					count: 0,
				},
				whiteNut: {
					discovered: false,
					count: 0,
				},
				redNut: {
					discovered: false,
					count: 0,
				},
				oranges: {
					discovered: false,
					count: 0,
				},
				noodles: {
					discovered: false,
					count: 0,
				},
				milk: {
					discovered: false,
					count: 0,
				},
				water: {
					discovered: false,
					count: 1,
				},
			},
			items: {
				fishingRod: {
					discovered: false,
				},
				lifePot: {
					discovered: false,
					count: 0,
				},
				mediPack: {
					discovered: false,
					count: 0,
				},
			},
			seeds: {
				orangeSeed: {
					discovered: false,
					count: 0,
				},
				whiteSeed: {
					discovered: false,
					count: 0,
				},
				redSeed: {
					discovered: false,
					count: 0,
				},
				peachSeed: {
					discovered: false,
					count: 0,
				},
				pinkSeed: {
					discovered: false,
					count: 0,
				},
				crimsonSeed: {
					discovered: false,
					count: 0,
				},
				tanSeed: {
					discovered: false,
					count: 0,
				},
				megaSeed: {
					discovered: false,
					count: 0,
				},
			},
			misc: {
				bigTreasureChest: {
					discovered: false,
					count: 0,
				},
				littleTreasureChest: {
					discovered: false,
					count: 0,
				},
				goldCoin: {
					discovered: false,
					count: 0,
				},
				goldKey: {
					discovered: false,
					count: 0,
				},
				silverCoin: {
					discovered: false,
					count: 0,
				},
				silverKey: {
					discovered: false,
					count: 0,
				},
				silverCup: {
					discovered: false,
					count: 0,
				},
			},
		}
	}

	// Game Functions
	NPCTalk() {
		if (!player.interactionAsset) return false
		let playerFrame
		let NPCFrame

		if (
			player.x - player.interactionAsset.x >
				player.y - player.interactionAsset.y &&
			player.image == player.sprites.down
		) {
			playerFrame = "down"
			NPCFrame = 1
		} else if (
			player.x - player.interactionAsset.x >
				player.y - player.interactionAsset.y &&
			player.image == player.sprites.left
		) {
			playerFrame = "left"
			NPCFrame = 3
		} else if (
			!(
				player.x - player.interactionAsset.x >
				player.y - player.interactionAsset.y
			) &&
			player.image == player.sprites.up
		) {
			playerFrame = "up"
			NPCFrame = 0
		} else if (
			!(
				player.x - player.interactionAsset.x >
				player.y - player.interactionAsset.y
			) &&
			player.image == player.sprites.right
		) {
			playerFrame = "right"
			NPCFrame = 2
		}
		player.image = player.sprites[playerFrame]
		player.frames.val = player.image === player.sprites.right ? 1 : 0
		player.interactionAsset.dialogueIndex = 0
		player.interactionAsset.frames.val = NPCFrame
		player.interactionAsset.moving = false
		chatBox.style.display = "flex"
		chatBox.style.pointerEvents = "all"
		chatBox.innerHTML = ""

		dialogueInterval = setInterval(this.addLetter, this.stats.talkSpeed)
		return (player.isInteracting = true)
	}

	continueNPCTalk(optionalIndex = 0) {
		chatBox.innerHTML = ""
		player.interactionAsset.letterIndex = 0
		player.interactionAsset.dialogueIndex++
		if (
			player.interactionAsset.dialogueIndex >=
			player.interactionAsset.dialogue.length
		) {
			player.interactionAsset.dialogueIndex = optionalIndex
			player.interactionAsset.moving = true
			player.isInteracting = false
			chatBox.style.display = "none"
			chatBox.style.pointerEvents = "none"
			clearInterval(dialogueInterval)
			return
		}
		clearInterval(dialogueInterval)
		dialogueInterval = setInterval(this.addLetter, this.stats.talkSpeed)
	}

	addLetter() {
		if (
			player.interactionAsset.letterIndex <
			player.interactionAsset.dialogue[
				player.interactionAsset.dialogueIndex
			].length
		) {
			chatBox.innerHTML +=
				player.interactionAsset.dialogue[
					player.interactionAsset.dialogueIndex
				][player.interactionAsset.letterIndex]
			player.interactionAsset.letterIndex++
		} else clearInterval(dialogueInterval)
	}

	switchMap(imageIndex, width, height, x, y) {
		this.switching = true
		for (let obj in keys) keys[obj] = false
		player.moving = false
		settingsImage.style.display = backpackImage.style.display = "none"
		gsap.to("#gameCanvas", {
			opacity: 0,
			duration: 0.5,
			onComplete: function () {
				background.lastX = background.x
				background.lastY = background.y
				background.image = background.sprites[imageIndex]
				background.width = width
				background.height = height
				background.setWidth = width
				background.setHeight = height
				background.x = x
				background.y = y
				mmentSpeed = 1
				loadingGif.style.display = "flex"
				reshape()
				loadingGif.src = loadingGif.src
				player.image = player.sprites.down
				player.frames.val = 0
				player.frames.elapsed = 6
				setTimeout(function () {
					settingsImage.style.display = backpackImage.style.display =
						"flex"
					loadingGif.style.display = "none"
					gsap.to("#gameCanvas", {
						opacity: 1,
						duration: 0.5,
						onComplete: function () {
							this.switching = false
						},
					})
				}, 3250)
			},
		})
	}

	animate() {
		for (let el in moving) moving[el] = !otherInfo.dialogsOpened
		if (!this.switching && this.isOngoing) this.checkMovement()
		background.draw()
		// currentColliderMap.forEach(collider => {collider.draw()})
		if (background.image === mainMapImage)
			plantables.forEach((plantable) => plantable.draw())
		currentCharacters.forEach((NoPC) => NoPC.draw())
		player.draw()
		// chatBox.innerHTML = `${currentCharacters[0].x}, ${currentCharacters[0].y}`
	}

	checkMovement() {
		player.moving = false
		if (
			keys.a ||
			keys.w ||
			keys.s ||
			(keys.d && background.image === mainMapImage)
		) {
			for (let i = 0; i < plantables.length; i++)
				plantables[i].selected = false
			for (let i = 0; i < plantables.length; i++) {
				plantables[i].selected = false
				if (
					rectangularCollision({
						rectangle1: {
							...player,
							x: player.x + player.width / 2,
							y: player.y + player.height,
							width: 0,
							height: 0,
						},
						rectangle2: plantables[i],
					})
				) {
					plantables[i].selected = true
					break
				}
			}
		}
		if (keys.w && keys.lastPressed == "w") {
			player.moving = true
			player.image = player.sprites.up
			checkForCharacterCollision({ x: 0, y: mmentSpeed })

			for (let i = 0; i < currentColliderMap.length; i++) {
				const currentCollider = currentColliderMap[i]
				if (
					rectangularCollision({
						rectangle1: player,
						rectangle2: {
							...currentCollider,
							x: currentCollider.x,
							y: currentCollider.y + mmentSpeed,
						},
					})
				) {
					moving.up = false
					break
				}
			}

			if (moving.up) {
				background.y += mmentSpeed
				currentColliderMap.forEach(
					(currentCollider) => (currentCollider.y += mmentSpeed),
				)
				currentCharacters.forEach(
					(currentCharacter) => (currentCharacter.y += mmentSpeed),
				)
				if (background.image === mainMapImage)
					plantables.forEach(
						(plantable) => (plantable.y += mmentSpeed),
					)
			}
		} else if (keys.s && keys.lastPressed == "s") {
			player.image = player.sprites.down
			player.moving = true

			checkForCharacterCollision({ x: 0, y: -mmentSpeed })

			for (let i = 0; i < currentColliderMap.length; i++) {
				const currentCollider = currentColliderMap[i]
				if (
					rectangularCollision({
						rectangle1: player,
						rectangle2: {
							...currentCollider,
							x: currentCollider.x,
							y: currentCollider.y - mmentSpeed,
						},
					})
				) {
					moving.down = false
					break
				}
			}

			if (moving.down) {
				background.y -= mmentSpeed
				currentColliderMap.forEach(
					(currentCollider) => (currentCollider.y -= mmentSpeed),
				)
				currentCharacters.forEach(
					(currentCharacter) => (currentCharacter.y -= mmentSpeed),
				)
				if (background.image === mainMapImage)
					plantables.forEach(
						(plantable) => (plantable.y -= mmentSpeed),
					)
			}
		} else if (keys.a && keys.lastPressed == "a") {
			player.image = player.sprites.left
			player.moving = true

			checkForCharacterCollision({ x: mmentSpeed, y: 0 })

			for (let i = 0; i < currentColliderMap.length; i++) {
				const currentCollider = currentColliderMap[i]
				if (
					rectangularCollision({
						rectangle1: player,
						rectangle2: {
							...currentCollider,
							x: currentCollider.x + mmentSpeed,
							y: currentCollider.y,
						},
					})
				) {
					moving.left = false
					break
				}
			}

			if (moving.left) {
				background.x += mmentSpeed
				currentCharacters.forEach(
					(currentCharacter) => (currentCharacter.x += mmentSpeed),
				)
				currentColliderMap.forEach(
					(currentCollider) => (currentCollider.x += mmentSpeed),
				)
				if (background.image === mainMapImage)
					plantables.forEach(
						(plantable) => (plantable.x += mmentSpeed),
					)
			}
		} else if (keys.d && keys.lastPressed == "d") {
			player.image = player.sprites.right
			player.moving = true
			checkForCharacterCollision({ x: -mmentSpeed, y: 0 })
			for (let i = 0; i < currentColliderMap.length; i++) {
				const currentCollider = currentColliderMap[i]
				if (
					rectangularCollision({
						rectangle1: player,
						rectangle2: {
							...currentCollider,
							x: currentCollider.x - mmentSpeed,
							y: currentCollider.y,
						},
					})
				) {
					moving.right = false
					break
				}
			}

			if (moving.right) {
				background.x -= mmentSpeed
				currentColliderMap.forEach(
					(currentCollider) => (currentCollider.x -= mmentSpeed),
				)
				currentCharacters.forEach(
					(currentCharacter) => (currentCharacter.x -= mmentSpeed),
				)
				if (background.image === mainMapImage)
					plantables.forEach(
						(plantable) => (plantable.x -= mmentSpeed),
					)
			}
		} else player.frames.val = player.image === player.sprites.right ? 1 : 0
	}

	// Game Classes
}

var game = new Game()

function rectangularCollision({ rectangle1, rectangle2 }) {
	return (
		rectangle1.x + rectangle1.width >= rectangle2.x &&
		rectangle1.x <= rectangle2.x + rectangle2.width &&
		rectangle1.y <= rectangle2.y + rectangle2.height &&
		rectangle1.y + rectangle1.height >= rectangle2.y
	)
}

function checkForCharacterCollision(characterOffset = { x: 0, y: 0 }) {
	player.interactionAsset = null
	for (let i = 0; i < currentCharacters.length; i++) {
		const currentCharacter = currentCharacters[i]
		if (
			rectangularCollision({
				rectangle1: player,
				rectangle2: {
					...currentCharacters[i],
					x: currentCharacters[i].x + characterOffset.x,
					y: currentCharacters[i].y + characterOffset.y
				}
			})
		) {
			player.interactionAsset = currentCharacter
			if (characterOffset.x == mmentSpeed && characterOffset.y == 0) moving.left = false
			if (characterOffset.x == -mmentSpeed && characterOffset.y == 0) moving.right = false
			if (characterOffset.x == 0 && characterOffset.y == mmentSpeed) moving.up = false
			if (characterOffset.x == 0 && characterOffset.y == -mmentSpeed) moving.down = false
			break
		}
	}
}

function checkForColliderCollision() {
	for (let i = 0; i < currentColliderMap.length; i++) {
				const currentCollider = currentColliderMap[i]
				if (
					rectangularCollision({
						rectangle1: player,
						rectangle2: {
							...currentCollider,
							x: currentCollider.x,
							y: currentCollider.y + mmentSpeed,
						},
					})
				) {
					if (characterOffset.x == mmentSpeed && characterOffset.y == 0) moving.left = false
					if (characterOffset.x == -mmentSpeed && characterOffset.y == 0) moving.right = false
					if (characterOffset.x == 0 && characterOffset.y == mmentSpeed) moving.up = false
					if (characterOffset.x == 0 && characterOffset.y == -mmentSpeed) moving.down = false
					break
				}
			}
}