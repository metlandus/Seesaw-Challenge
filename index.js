const clickableArea = document.querySelector(".clickable-area");
const plank = document.createElement("div");
plank.className = "plank";
const plankHeight = 15;
const plankWidth = 500;
plank.style.height = `${plankHeight}px`;
plank.style.width = `${plankWidth}px`;
clickableArea.appendChild(plank);

// const mainframe = document.querySelector(".main-frame");
// const pivot = document.createElement("div");
// pivot.className = "pivot";
// mainframe.appendChild(pivot);

let weights = [];

function createNewBall() {
	clickableArea.insertAdjacentHTML(
		"afterbegin",
		"<div class=new-ball></div>",
	);
}
function generateRandomObj() {
	const nextMass = Math.floor(Math.random() * 10 + 1);
	console.log("Next Mass is :", nextMass);
	return nextMass;
}

// Here is for creating a "ghost"
clickableArea.addEventListener("mouseenter", createNewBall);
clickableArea.addEventListener("mouseleave", () => {
	const ball = document.querySelector(".new-ball");
	clickableArea.removeChild(ball);
});
clickableArea.addEventListener("mousemove", (e) => {

	const ball = document.querySelector(".new-ball");
	ball.style.left = `${e.clientX - 10}px`;
	ball.style.top = `${e.clientY - 20}px `;
});

clickableArea.addEventListener("click", (e) => {
	const weight = generateRandomObj();
	const newObj = document.createElement("div");
	newObj.classList.add("new-obj");
	newObj.style.left = `${e.clientX - 10}px`;
	newObj.style.top = `${e.clientY - 20}px`;
	newObj.style.width = `${weight * 2 + 20}px`;
	newObj.style.height = `${weight * 2 + 20}px`;
	newObj.style.transitionDuration = "700ms";
	setTimeout(() => (newObj.style.top = `${70}%`), 0);
	clickableArea.appendChild(newObj);
	newObj.setAttribute("id", weights.length);
	const side = e.clientX > plankWidth / 2 ? "right" : "left";
	weights.push({
		id: weights.length,
		weight,
		position: e.pageX,
		side: side,
	});
	console.log(weights);
});
