//HTML/CSS-Changing Functions
const chatBox = document.getElementById("dialogueBox")
const loadingGif = document.getElementById("loadingGif")
reshape = () => {
	const imageWidth = loadingGif.offsetWidth
	const imageHeight = loadingGif.offsetHeight
	loadingGif.style.top = `calc(50% - ${imageHeight/2}px)`
	loadingGif.style.left = `calc(50% - ${imageWidth/2}px)`
}

reshape()
window.onresize = reshape

function toggleBackpack() {
	if(otherInfo.settingsOpacity && !game.switching) gsap.to("#backpackViewer", {
			opacity: otherInfo.backpackOpacity,
			duration: 0,
			onComplete: function () {
				backpackViewer.style.display = otherInfo.backpackOpacity === 0 ? "none" : "flex"
				backpackViewer.style.pointerEvents = otherInfo.backpackOpacity === 0 ? "none" : "all"
				backpackAll.forEach(element => {
					element.style.display = otherInfo.backpackOpacity === 0 ? "none" : "flex"
					element.style.pointerEvents = otherInfo.backpackOpacity === 0 ? "none" : "all"
				})
				otherInfo.backpackOpacity = otherInfo.backpackOpacity === 0 ? 1 : 0
				otherInfo.dialogsOpened = otherInfo.backpackOpacity && otherInfo.settingsOpacity ? false : true
				},
	})
			canvas.style.filter = `brightness(${
				otherInfo.dialogsOpened ? 0.5 : 1
			})`
			backpackImage.style.filter = `brightness(${
				otherInfo.dialogsOpened ? 0.5 : 1.2
			})`
			settingsImage.style.filter = `brightness(${
				otherInfo.dialogsOpened ? 0.5 : 1
			})`
	backpackImage.style.pointerEvents = settingsImage.style.pointerEvents = otherInfo.dialogsOpened ? "none" : "all"
}

function toggleSettings() {
	if(otherInfo.backpackOpacity && !game.switching) gsap.to("#settingsViewer", {
			opacity: otherInfo.settingsOpacity,
			duration: 0,
			onComplete: function () {
				settingsViewer.style.display =
					otherInfo.settingsOpacity === 0 ? "none" : "flex"
				settingsViewer.style.pointerEvents =
					otherInfo.settingsOpacity === 0 ? "none" : "all"
				settingsAll.forEach((element) => {
					element.style.display =
						otherInfo.settingsOpacity === 0 ? "none" : "flex"
					element.style.pointerEvents =
						otherInfo.settingsOpacity === 0 ? "none" : "all"
				})
				otherInfo.settingsOpacity =	otherInfo.settingsOpacity === 0 ? 1 : 0
				otherInfo.dialogsOpened = otherInfo.backpackOpacity && otherInfo.settingsOpacity ? false : true
			},
	})
			canvas.style.filter = `brightness(${
				otherInfo.dialogsOpened ? 0.5 : 1
			})`
			backpackImage.style.filter = `brightness(${
				otherInfo.dialogsOpened ? 0.5 : 1.2
			})`
			settingsImage.style.filter = `brightness(${
				otherInfo.dialogsOpened ? 0.5 : 1
			})`
		backpackImage.style.pointerEvents = settingsImage.style.pointerEvents =
			otherInfo.dialogsOpened ? "none" : "all"
}

function drpdownInteract() {
	document.addEventListener("DOMContentLoaded", function (event) {
		var dropdowns = document.getElementsByClassName("explorer")

		for (var i = 0; i < dropdowns.length / 2; i++) {
			var dropdownButton = dropdowns[i]
			var dropdownContent =
				dropdownButton.querySelector(".dropdown-content")

			dropdownButton.addEventListener("mouseover", function () {
				dropdownContent.style.display = "block"
			})

			dropdownButton.addEventListener("mouseout", function () {
				dropdownContent.style.display = "none"
			})

			dropdownContent.addEventListener("mouseover", function () {
				dropdownContent.style.display = "block"
			})

			dropdownContent.addEventListener("mouseout", function () {
				dropdownContent.style.display = "none"
			})
		}
	})
}
try {
	drpdownInteract()
} catch (e) {
	console.log(e)
}

// window.addEventListener("beforeunload", function (e) {
// 	e.preventDefault()
// 	e.returnValue =
// 		"Are you sure you want to leave? You can save your progress before leaving."
// 	return "Are you sure you want to leave? You can save your progress before leaving."
// })

//Game
const settingsImage = document.getElementById("settingImage")
const backpackImage = document.getElementById("backpackImage")
const backpackViewer = document.getElementById("backpackViewer")
const backpackAll = backpackViewer.querySelectorAll("*")
const settingsViewer = document.getElementById("settingsViewer")
const settingsAll = settingsViewer.querySelectorAll("*")
const canvas = document.getElementById("gameCanvas")
const c = canvas.getContext("2d")

let mmentSpeed = 1
let isConnected = true
let currentColliderMap = [...mainBoundaries]
let currentCharacters = [...mainCharacters]
let otherInfo = {
	backpackOpacity: 1,
	settingsOpacity: 1,
	dialogsOpened: false
}
var moving = {
	up: false,
	down: false,
	left: false,
	right: false
}
let keys = {
	w: false,
	s: false,
	a: false,
	d: false,
	x: false,
	lastPressed: null
}

const background = new Sprite(
	-873, -525,
	{ max: 1 },
	mainMapImage,
	2000, 1200,
	[mainMapImage, bookStoreImage]
)
background.width = 2000
background.height = 1200

const player = new Sprite(
	canvas.width / 2 - 8,
	canvas.height / 2 - 16,
	{ max: 4, elapseTiming: 10},
	playerDown,
	15,
	16,
	{
		up: playerUp,
		down: playerDown,
		left: playerLeft,
		right: playerRight,
	},
)

addEventListener("keydown", (e) => {
	if (game.isOngoing && !game.switching && !player.isInteracting)
	  switch (e.key) {
		case "w":
			keys.w = true
			keys.lastPressed = "w"
			break
		case "s":
			keys.s = true
			keys.lastPressed = "s"
			break
		case "a":
			keys.a = true
			keys.lastPressed = "a"
			break
		case "d":
			keys.d = true
			keys.lastPressed = "d"
			break
	}
})

addEventListener("keyup", (e) => {
	if (game.isOngoing && !player.isInteracting)
		switch (e.key) {
			case "e":
				if (game.bookstore.enter.xMax >= background.x && background.x > game.bookstore.enter.xMin &&
					game.bookstore.enter.yMax >= background.y && background.y >= game.bookstore.enter.yMin && background.image === mainMapImage) {
					currentColliderMap = [...bookstoreCollisions]
					game.switchMap(1, 480, 480, -92, -70)
					break
				}
				if (game.bookstore.exit.xMax >= background.x && background.x >= game.bookstore.exit.xMin &&
					game.bookstore.exit.yMax <= background.y && background.y <= game.bookstore.exit.yMin && background.image === bookStoreImage) {
					currentColliderMap = [...mainBoundaries]
					game.switchMap(0, 2000, 1200, background.lastX, background.lastY)
					break
				}
				break
			case "x":
				toggleSettings()
				break
			case " ":
				e.preventDefault()
				toggleBackpack()
				break
			case "q":
				game.NPCTalk()
				break
			case "w":
				keys.w = false
				break
			case "s":
				keys.s = false
				break
			case "a":
				keys.a = false
				break
			case "d":
				keys.d = false
				break
		}
})



function perform() {
	if (game.isOngoing) game.animate()
	requestAnimationFrame(perform)
}
perform()

chatBox.onclick = () => game.continueNPCTalk()
ononline = () => isConnected = true
onoffline = () => {
	isConnected = false
	console.log("Your internet connection is either unstable or you are not connected. Your progress will be saved soon.")
}