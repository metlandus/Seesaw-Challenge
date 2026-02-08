const clickableArea = document.querySelector(".clickable-area");
const plank = document.createElement("div");
plank.className = "plank";
const plankHeight = 15;
const plankWidth = 500;
plank.style.height = `${plankHeight}px`;
plank.style.width = `${plankWidth}px`;
clickableArea.appendChild(plank);
let nextWeight = document.querySelector(".stat-next-w");

let leftW = document.querySelector(".stat-left-w");
let rightW = document.querySelector(".stat-right-w");

const ghost = document.createElement("div");
ghost.className = "ghost";
plank.appendChild(ghost);
ghost.style.opacity = "0";

let initial = generateRandomObj();
ghost.style.width = `${initial * 2 + 30}px`;
ghost.style.height = `${initial * 2 + 30}px`;
ghost.innerText = `${initial} kg`;

nextWeight.innerText = `${initial} kg`;
let weights = localStorage.getItem("weights");
weights = JSON.parse(weights) || [];
let rotation = localStorage.getItem("rotation");
rotation = parseFloat(rotation) || 0;

const pivot = document.createElement("div");
pivot.className = "pivot";
clickableArea.appendChild(pivot);
pivot.style.left = "50%";
pivot.style.transform = "translateX(-50%)";
pivot.style.top = "100%";

const rotationDisp = document.querySelector(".stat-rotation");

function retrieve(arr, rotation) {
	arr.forEach((e) => {
		const newObj = document.createElement("div");
		newObj.setAttribute("id", e.id);
		newObj.innerText = `${e.weight} kg`;
		newObj.classList.add("new-obj");
		newObj.style.left = `${e.position}px`;
		newObj.style.transform = "translateX(-50%)";
		plank.appendChild(newObj);
		newObj.style.width = `${e.weight * 2 + 30}px`;
		newObj.style.height = `${e.weight * 2 + 30}px`;
		newObj.style.top = `${-plankHeight}px`;
	});
	plank.style.transform = `rotate(${rotation}deg)`;
}

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
			totalTorque -= left;
		});

		rightSide.forEach((e) => {
			const right = e.weight * (e.position - plankWidth / 2);
			totalTorque += right;
		});
		return { totalTorque, leftSide, rightSide };
	} else {
		alert("There are no weight");
	}
}

function calcRotation(totalTorque) {
	console.log("Total Torque:", totalTorque);
	let scale = totalTorque / 200;

	if (scale >= 30) {
		return 30;
	} else if (scale <= -30) {
		return -30;
	} else {
		return scale;
	}
}

// Here is for creating a "ghost"
clickableArea.addEventListener("mouseenter", (e) => {
	ghost.style.opacity = "0.7";

	ghost.style.left = `${50}%`;
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
		nextWeight.innerText = `${weight} kg`;
	} else {
		weight = initial;
		initial = generateRandomObj();
		nextWeight.innerText = `${weight} kg`;
	}
	ghost.style.width = `${initial * 2 + 30}px`;
	ghost.style.height = `${initial * 2 + 30}px`;
	ghost.innerText = `${initial} kg`;

	const newObj = document.createElement("div");
	newObj.innerText = `${weight} kg`;
	newObj.classList.add("new-obj");
	newObj.style.left = `${e.offsetX}px`;
	newObj.style.transform = "translateX(-50%) translateY(-50%)";
	let localY = e.offsetY - plank.offsetTop;
	newObj.style.top = `${localY + plankHeight}px`;
	newObj.style.width = `${weight * 2 + 30}px`;
	newObj.style.height = `${weight * 2 + 30}px`;
	newObj.style.transitionDuration = "700ms";
	setTimeout(() => (newObj.style.top = `${plankHeight / 2}px`), 0);
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
	let rotation = calcRotation(totalTorque.totalTorque);
	plank.style.transform = `rotate(${rotation}deg)`;

	rotationDisp.innerText = `${rotation.toFixed(1)} °`;

	let leftWeight = totalTorque.leftSide.reduce((acc, cur) => {
		return acc + cur.weight;
	}, 0);
	let rightWeight = totalTorque.rightSide.reduce((acc, cur) => {
		return acc + cur.weight;
	}, 0);
	leftW.innerText = `${leftWeight} kg`;
	rightW.innerText = `${rightWeight} kg`;

	// localStorage Section
	localStorage.setItem("weights", JSON.stringify(weights));
	localStorage.setItem("rotation", JSON.stringify(rotation));
});

function reset() {
	weights = [];
	localStorage.clear();
	const allBalls = document.querySelectorAll(".new-obj");
	allBalls.forEach((e) => plank.removeChild(e));
	plank.style.transform = `rotate(${0}deg)`;
	rotationDisp.innerText = `${0} °`;
	leftW.innerText = "0 kg";
	rightW.innerText = "0 kg";
}
retrieve(weights, rotation);
