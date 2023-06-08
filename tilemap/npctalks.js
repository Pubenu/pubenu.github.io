const encrypted = CryptoJS.AES.encrypt("plaintext", "this ${4^2341}").toString()
const decrypted = CryptoJS.AES.decrypt(encrypted, "this ${4^2341}").toString(CryptoJS.enc.Utf8)

fetch("localTXT.json")
	.then((response) => response.json())
	.then((data) => {
		// Handle the JSON data
		console.log(data)
	})
	.catch((error) => {
		// Handle any errors that occur during the fetch
		console.error("Error:", error)
	})


const welcomerTalk = [
	"Hey. Welcome to Stewards' Town.",
	"Every year, someone gets selected to go to an island and explore some farming skills.",
	"Two of the previously selected people have to stay and help the newcomer. I'm one of them.",
	"I honestly think this was a waste of time, but everyone else just thinks I'm being ungrateful.",
	"Anyways, lets just move on for now.",
	"We should go to the mayor now. He will give you some instructions.",
	". . .",
	"Wait, you don't know where the mayor is???",
	"This place really is a waste of time! They didn't even tell you where anything is!",
	"Maybe we should go to the library first. They always know where everything is.",
	"If you don't know where things are, you can go to the library. They always have something for you, most of the time.",
	"Follow me, I'll lead you to the library.",
]

const mayorTalk = [
	"Hmmm? Who wants to disturb my peace?",
	"Sorry, mayor. It's the helper here with the new person.",
	"Ah, I see. What might your name be, young fellow?",
]