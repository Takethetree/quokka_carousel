(d => {
	let container = d.querySelector(".carousel-container");
	let items = container.querySelectorAll(".carousel-list_item");
	let previous = container.querySelector(".button--left");
	let next = container.querySelector(".button--right");
	let counter = 0;
	let amount = items.length;
	let current = items[0];
	let dots = Array.from(d.querySelectorAll(".dot"));
	let dot = d.querySelector(".dot");
	let currentDot = dots[0];

	container.classList.add("active");
	dot.classList.add("selected");

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
		currentDot = dots[counter];
		dots.forEach((dot, i) => {
			dot.classList.remove("selected");
		})
		currentDot.classList.add("selected");
	}

	previous.addEventListener("click", () => scroll(-1));
	previous.addEventListener("touchstart", () => scroll(-1));
	next.addEventListener("click", () => scroll(1));
	next.addEventListener("touchstart", () => scroll(1));
	scroll(0);

	// let automatic = () => window.setTimeout(scroll(1), 1000);
	// automatic();

	setInterval(function(){ scroll(1); }, 6000);

	dots.forEach((dot, i) => dot.addEventListener("click", () => {
		current.classList.remove("current");
		counter = i;
		current = items[counter];
		current.classList.add("current");

		dots.forEach((dot, i) => {
			dot.classList.remove("selected");
		})
		dot.classList.add("selected");


	}))

	// dots.forEach(dots.addEventListener("click", () => {
	// 	// let currentDot = dots.indexOf(dot);
	// 	// console.log(currentDot);
	// 	console.log("hello");
	// }))


	// query selector to get the .dots
	// convert to an array
	// iterate over these adding a click handler that does something with the index number of each dot
	// use current / current classList lines!

	// if 

})(document);