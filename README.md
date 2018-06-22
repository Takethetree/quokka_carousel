# quokka_carousel
A slideshow carousel of quokka pictures!

## Introduction

This README documents the Quokka Carousel, a simple image slideshow built with HTML, CSS and JS. The JS for the scrolling
mechanism is based on ideas from the following blog: 

https://christianheilmann.com/2015/04/08/keeping-it-simple-coding-a-carousel/

Ideas for swiping functionality came from the following: 

https://css-tricks.com/simple-swipe-with-vanilla-javascript/

Thanks to Pete Thomas of https://developme.training/ for additional help. 

## HTML

The image gallery is built using an ordered list (ol). Each list item (li) contains a \<div> with a background image - 
allowing easier styling than using an \<img> tag. 

Two *\<btn>* tags are used for left / right scrolling. The \<ol> and buttons are placed inside a \<div> with the class:
'carousel-container'. A further class of 'active' is added later by manipulating the DOM with JS. 

The image-selector dots are based on \<span> tags, nested inside two \<div> tags for easier positioning. 

## CSS

Normalize.css (https://necolas.github.io/normalize.css/) was used to provide styling consistency. 

The 'carousel-container' class is given relative positioning, to allow containing elements to be absolutely positioned. 

Two classes are added to the DOM by JS. The carousel container is given the class 'active', which triggers the carousel
functionality. The class 'current' is given to the \<li> which is currently displaying an image. 

By default, \<li> tags are absolutely positioned above the carousel container and so their images are invisible. Adding
the 'current' class to an \<li> changes its positioning so it is inside the carousel container and thus visible. JS is used to
change which \<li> has the 'current' class using a scrolling mechanism. The scrolling mechanism can be controlled with left/
right buttons, clickable dots and also has an autoscrolling function, which automatically changes the image every 6s. 

A fade animation is used to mark image transitions.

The page has two displays, a desktop display and mobile / tablet display. Media queries were used to transition between the desktop display (with buttons) and the mobile / tablet display (using a 'swiper' \<div>). 

## JS

#### Left / Right Buttons


The carousel is based largely on the following *scroll* function: 

```javascript
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
	next.addEventListener("click", () => scroll(1));
	scroll(0);
  
```

The function uses a counter variable - initially set to 0 - which keeps track of which \<li> image is currently being shown. 

The counter is incremented using a 'direction' argument, which can have a value of -1 or 1, depending on which direction the
carousel is scrolling. Two 'if' statements prevent the counter from exceeding the number of items, or going below 0 (ie: if
you scroll right on the final image, it goes back to the first image, and vice-versa). 

With each iteration of the *current* function, the 'current' class is removed from the previous \<li> and added to the new one. 
The *current* function is also used to update the clickable dots, so these track which image is selected. 

Event listeners are used on the left and right buttons, which run the *current* function with a direction argument of -1 and
1 respectively. 

#### Clickable Dots


Clickable dot functionality is provided by the following code:

```javascript
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
```

This code uses an event listener to iterate over an array of elements with the 'dot' class, and adds the 'current' class 
to the \<li> image corresponding to the clicked dot. 

The click triggers a further array iteration, which adds 'selected' class to the dot which has been clicked. A dot with the 
'selected' class has separate CSS styling to other dots, showing which image has been selected. 

#### Auto-Scrolling


Auto-scrolling is provided by this code: 

```javascript
	setInterval(function(){ scroll(1); }, 6000);
  ```

This invokes the *scroll* function every 6s, with a direction argument of 1, allowing for automatic right-scrolling. An if-statement is used to disable the auto-scroll for smaller screen sizes. 

#### Swiping

Swiper functionality occurs at screen widths of 633px and below, and is based on the following code:

```javascript

let unify = e => {
	return e.changedTouches ? e.changedTouches[0]:e; 
}

let initialX = null;

let detectX = e => {
	initialX = unify(e).clientX;
}


let move = e => {
	if(initialX || initialX === 0) {
		let change = unify(e).clientX - initialX;
		let plusOrMinus = Math.sign(change);

		if(plusOrMinus < 0) {
			return scroll(-1);
		} else if(plusOrMinus > 0) {
			return scroll(1);
		} else {
			return scroll(0);
		}
		initialX = null;
	}

}



swiper.addEventListener("mousedown", detectX, false);
swiper.addEventListener("touchstart", detectX, false);

swiper.addEventListener("mouseup", move, false);
swiper.addEventListener("touchend", move, false);

```
This code detects a change in the x-axis position between mousedown / mouseup and touchstart / touchend events, allowing a +ve change to be registered as a right swipe, and -ve change as a left swipe. 

Firstly mouse and touch events are unified in the *unify* function. 

The *detectX* function then logs the initial x-axis position - using a mousedown / touchstart event - and stores it in an *initialX* variable. 

The *move* function then registers the change between the *initialX* variable and the x-axis position of a mouseup / touchend event. Using Math.sign and an if/statement, the *scroll* function (see above) is then invoked with a -1 value for -ve changes in x-position (resulting in a left swipe) and a +1 value for +ve changes in x-position (resulting in a right swipe). 

