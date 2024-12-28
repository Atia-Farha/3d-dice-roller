document.addEventListener("DOMContentLoaded", function () {
    const rollButton = document.getElementById("rollButton");
    const dice = document.getElementById("dice");

    rollButton.addEventListener("click", function () {
        // Add rolling class to disable button during rolling
        rollButton.classList.add("rolling");

        // Generate a random number between 1 and 6 for the dice roll result
        const result = Math.floor(Math.random() * 6) + 1;

        // Randomly rotate the dice to simulate a rolling effect
        const randomX = Math.floor(Math.random() * 720) + 360;
        const randomY = Math.floor(Math.random() * 720) + 360;

        // Start the rolling animation
        dice.style.transition = "transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
        dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

        // After the random rolling animation, settle on the final result
        setTimeout(() => {
            let finalX = 0, finalY = 0;

            switch (result) {
                case 1: finalX = 0; finalY = 0; break;
                case 2: finalX = 0; finalY = 180; break; // Fixed face 2
                case 3: finalX = 0; finalY = -90; break; // Fixed face 3
                case 4: finalX = 0; finalY = 90; break; // Fixed face 4
                case 5: finalX = 90; finalY = 0; break; // Fixed face 5
                case 6: finalX = -90; finalY = 0; break; // Fixed face 6
            }

            dice.style.transition = "transform 0.5s ease-out";
            dice.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;

            const toast = document.createElement("div");
            toast.classList.add("toast");
            toast.textContent = `You got ${result}!`;
            document.body.appendChild(toast);

            // Remove rolling class to enable button after the animation ends
            setTimeout(() => {
                rollButton.classList.remove("rolling");
            }, 700);

            // Remove the toast after the animation ends (1s fade-in + 1s fade-out)
            setTimeout(() => {
                toast.remove();
            }, 3000); // The toast should disappear 3 seconds after it is shown

        }, 1500); // Duration of the initial dice rolling animation
    });

    // Prevent the default behavior of the Spacebar key (page scroll)
    document.addEventListener("keydown", function (event) {
        if (event.key === " " && !rollButton.classList.contains("rolling")) {
            event.preventDefault();
            rollButton.click(); // Trigger the roll button click on Spacebar press
        }
    });
});