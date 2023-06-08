function drpdownInteract() {
	document.addEventListener("DOMContentLoaded", function (event) {
		var dropdowns = document.getElementsByClassName("explorer");
		
		for (var i = 0; i < dropdowns.length / 2; i++) {
			var dropdownButton = dropdowns[i];
			var dropdownContent = dropdownButton.querySelector(".dropdown-content");
			
		dropdownButton.addEventListener("mouseover", function () {
			dropdownContent.style.display = "block";
		});

		dropdownButton.addEventListener("mouseout", function () {
			dropdownContent.style.display = "none";
		});

		dropdownContent.addEventListener("mouseover", function () {
			dropdownContent.style.display = "block";
		});

		dropdownContent.addEventListener("mouseout", function () {
			dropdownContent.style.display = "none";
		});
	}
});

}
try {
	drpdownInteract()
} catch (e) {
	console.log(e)
}