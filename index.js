const seesawPlank = document.querySelector(".plank");

const clickableArea = document.querySelector(".clickable-area");

function createNewBall() {
	clickableArea.insertAdjacentHTML(
		"afterbegin",
		"<div class=new-ball></div>",
	);
}
clickableArea.addEventListener("mouseenter", createNewBall);
clickableArea.addEventListener("mouseleave", () => {
	const ball = document.querySelector(".new-ball");
	clickableArea.removeChild(ball);
});
clickableArea.addEventListener("mousemove", (e) => {
	const ball = document.querySelector(".new-ball");
	ball.style.left = `${e.pageX}px`;
	ball.style.top = `44%`;
	console.log(e);
});
