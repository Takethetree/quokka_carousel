(d => {
	let container = d.querySelector(".carousel-container");
	let items = container.querySelectorAll(".carousel-list-item");
	let previous = container.querySelector(".left-button");
	let next = container.querySelector(".right-button");
	let counter = 0;
	let amount = items.length;
	let current = items[0];
	container.classList.add("active");
	let scroll = direction => {
		current.classList.remove("current");
		counter = counter + direction;
		if (direction === -1 && counter < 0) {
			counter = amount -1
		}
		if (direction === 1 && !items[counter]) {
			counter = 0;
		}
		current = items[counter];
		current.classList.add("current");
	}
	previous.addEventListener("click", () => scroll(-1));
	next.addEventListener("click", () => scroll(1));
	scroll(0);

	let dots = Array.from(d.querySelectorAll(".dot"));
	dots.forEach(dot.addEventListener("click", () => {
		// let currentDot = dots.indexOf(dot);
		// console.log(currentDot);
		console.log("hello");
	}))


	// query selector to get the .dots
	// convert to an array
	// iterate over these adding a click handler that does something with the index number of each dot
	// use current / current classList lines!

})(document);