const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow = "0 0 25px rgba(96,165,250,0.4)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "none";

    });

});
