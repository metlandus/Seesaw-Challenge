const clickableArea = document.querySelector(".clickable-area");
const plank = document.createElement("div");
plank.className = "plank";
const plankHeight = 15;
const plankWidth = 500;
plank.style.height = `${plankHeight}px`;
plank.style.width = `${plankWidth}px`;
clickableArea.appendChild(plank);

const rotation = document.querySelector(".rotation");

// const body = document.querySelector("body");
// body.addEventListener("mousemove", (e) => console.log(e.x));

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

// const firstObj = generateRandomObj();

function generateRandomObj() {
	const nextMass = Math.floor(Math.random() * 10 + 1);
	// console.log("Next Mass is :", nextMass);
	return nextMass;
}
function calcTorque(weights) {
	if (weights.length) {
		let leftSide = weights.filter((e) => e.side === "left");
		let rightSide = weights.filter((e) => e.side === "right");
		let totalTorque = 0;
		leftSide.forEach((e) => {
			const left = e.weight * (plankWidth / 2 - e.position);
			return (totalTorque -= left);
		});

		rightSide.forEach((e) => {
			const right = e.weight * (e.position - plankWidth / 2);
			return (totalTorque += right);
		});
		return totalTorque;
	} else {
		alert("There are no weight");
	}
}

function calcRotation(totalTorque) {
	console.log("Total Torque:", totalTorque);
	let scale = Math.round(totalTorque / 400);

	if (scale >= 15) {
		return 15;
	} else if (scale <= -15) {
		return -15;
	} else {
		return scale;
	}
}

// Here is for creating a "ghost"
clickableArea.addEventListener("mouseenter", createNewBall);
clickableArea.addEventListener("mouseleave", () => {
	const ball = document.querySelector(".new-ball");
	clickableArea.removeChild(ball);
});
clickableArea.addEventListener("mousemove", (e) => {
	const ball = document.querySelector(".new-ball");
	ball.style.left = `${e.offsetX - 5}px`;
	ball.style.top = `${e.offsetY - 10}px `;
});
// clickableArea.addEventListener("mousemove", (e) => console.log(e.x));
clickableArea.addEventListener("click", (e) => {
	const weight = generateRandomObj();
	const newObj = document.createElement("div");
	newObj.innerText = `${weight} kg`;
	newObj.classList.add("new-obj");
	newObj.style.left = `${e.offsetX - 5}px`;
	newObj.style.top = `${e.offsetY - clickableArea.offsetHeight}px`;
	newObj.style.width = `${weight * 2 + 30}px`;
	newObj.style.height = `${weight * 2 + 30}px`;
	newObj.style.transitionDuration = "700ms";
	setTimeout(() => (newObj.style.top = `${0 - plankHeight}px`), 0);
	plank.appendChild(newObj);
	newObj.setAttribute("id", weights.length);
	const side = e.offsetX > plankWidth / 2 ? "right" : "left";
	weights.push({
		id: weights.length,
		weight,
		position: e.offsetX,
		side: side,
	});
	const totalTorque = calcTorque(weights);
	let rotation = calcRotation(totalTorque);
	rotation += rotation;
	// console.log("Here are the stats", {
	// 	rotation,
	// 	weight,
	// 	rotationSide: rotation > 0 ? "right" : "left",
	// 	position: e.offsetX,
	// });
	plank.style.transform = `rotate(${rotation}deg)`;
	rotation.innerHTML = ` ${rotation} degree`;

	// const allBalls = document.querySelectorAll(".new-obj");
	// console.log("🚀 ~ allBalls:", allBalls);
	// allBalls.forEach((e) => e.style.top === `${plank.getBoundingClientRect().y}%`);
});
