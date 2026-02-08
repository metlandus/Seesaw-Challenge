let initial = generateRandomObj();
let weights = [];

const clickableArea = document.querySelector(".clickable-area");
const plank = document.createElement("div");
plank.className = "plank";
const plankHeight = 15;
const plankWidth = 500;
plank.style.height = `${plankHeight}px`;
plank.style.width = `${plankWidth}px`;
clickableArea.appendChild(plank);

const pivot = document.createElement("div");
pivot.className = "pivot";
clickableArea.appendChild(pivot);
pivot.style.left = "50%";
pivot.style.transform = "translateX(-50%)";
pivot.style.top = "100%";

const ghost = document.createElement("div");
ghost.className = "ghost";
plank.appendChild(ghost);
ghost.style.opacity = "0";
console.log(initial);

ghost.style.width = `${initial * 2 + 30}px`;
ghost.style.height = `${initial * 2 + 30}px`;
ghost.innerText = `${initial} kg`;

const rotationDisp = document.querySelector(".rotation");

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
	let scale = totalTorque / 300;

	if (scale >= 15) {
		return 15;
	} else if (scale <= -15) {
		return -15;
	} else {
		return scale;
	}
}

// Here is for creating a "ghost"
clickableArea.addEventListener("mouseenter", (e) => {
	ghost.style.opacity = "0.7";

	ghost.style.left = `${e.offsetX - 35}px`;
	ghost.style.top = `${50}%`;
	ghost.style.transform = "translateY(-50%)";
});
clickableArea.addEventListener("mouseleave", () => {
	ghost.style.opacity = "0";
});
clickableArea.addEventListener("mousemove", (e) => {
	ghost.style.left = `${e.offsetX - 35}px`;
	ghost.style.top = `${50}% `;
	ghost.style.transform = "translateY(-50%)";
});

plank.addEventListener("click", (e) => {
	let weight;
	if (!initial) {
		weight = generateRandomObj();
	} else {
		weight = initial;
		initial = generateRandomObj();
	}
	ghost.style.width = `${initial * 2 + 30}px`;
	ghost.style.height = `${initial * 2 + 30}px`;
	ghost.innerText = `${initial} kg`;

	const newObj = document.createElement("div");
	newObj.innerText = `${weight} kg`;
	newObj.classList.add("new-obj");
	let localX = e.offsetX - plank.offsetLeft;
	newObj.style.left = `${e.offsetX}px`;
	newObj.style.transform = "translateX(-50%)";
	console.log("E", e);
	let localY = e.offsetY - plank.offsetTop;

	newObj.style.top = `${localY + plankHeight}px`;
	newObj.style.rotation = newObj.style.width = `${weight * 2 + 30}px`;
	newObj.style.height = `${weight * 2 + 30}px`;
	newObj.style.transitionDuration = "700ms";
	setTimeout(() => (newObj.style.top = `${-plankHeight}px`), 0);
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
	plank.style.transform = `rotate(${rotation}deg)`;
	rotationDisp.innerText = `${rotation.toFixed(1)} °`;

	// localStorage Section
	console.log(weights);
});

function reset() {
	weights = [];
	console.log("MERHABA");
}
