const featuredGames = [
    {
        title: "Counter-Strike 2",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
        thumbnails: [
            "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
        ],
        availability: "Recommended because you have played games tagged with",
        tag: "Top Seller",
        price: "Free to Play",
    },
    {
        title: "Cyberpunk 2077",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
        thumbnails: [
            "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
        ],
        availability: "Recommended because you play Action RPGs",
        tag: "Award Winner",
        price: "59,99€",
    },
    {
        title: "Elden Ring",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
        thumbnails: [
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
        ],
        availability: "Overwhelmingly Positive Reviews",
        tag: "GOTY 2022",
        price: "59,99€",
    },
    {
        title: "Red Dead Redemption 2",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
        thumbnails: [
            "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
            "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
        ],
        availability: "Recommended because you play Open World games",
        tag: "Bestseller",
        price: "49,99€",
    },
];

let currentIndex = 0;
let autoplayTimer = null;
let isTransitioning = false;

function getElements() {
    return {
        mainImage: document.querySelector(".store-scroll-content-left img"),
        title: document.querySelector(".store-scroll-game-title"),
        thumbnails: document.querySelectorAll(".store-scroll-thumbnails img"),
        availability: document.querySelector(".store-scroll-availability"),
        tag: document.querySelector(".store-scroll-tag"),
        price: document.querySelector(".store-scroll-price"),
        content: document.querySelector(".store-scroll-content"),
        dots: document.querySelectorAll(".store-carousel-dot"),
    };
}

function updateDots(index) {
    document.querySelectorAll(".store-carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function goToSlide(index, direction = "next") {
    if (isTransitioning) return;
    isTransitioning = true;

    const el = getElements();
    const game = featuredGames[index];

    // Fade out
    el.content.style.opacity = "0";
    el.content.style.transform = direction === "next" ? "translateX(-12px)" : "translateX(12px)";

    setTimeout(() => {
        // Update content
        el.mainImage.src = game.image;
        el.title.textContent = game.title;
        el.thumbnails.forEach((img, i) => {
            img.src = game.thumbnails[i] || game.image;
        });
        el.availability.textContent = game.availability;
        el.tag.textContent = game.tag;
        el.price.textContent = game.price;

        // Reset for fade in from opposite direction
        el.content.style.transition = "none";
        el.content.style.transform = direction === "next" ? "translateX(12px)" : "translateX(-12px)";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.content.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                el.content.style.opacity = "1";
                el.content.style.transform = "translateX(0)";
                updateDots(index);
                isTransitioning = false;
            });
        });
    }, 400);
}

function next() {
    const nextIndex = (currentIndex + 1) % featuredGames.length;
    goToSlide(nextIndex, "next");
    currentIndex = nextIndex;
    resetTimer();
}

function prev() {
    const prevIndex = (currentIndex - 1 + featuredGames.length) % featuredGames.length;
    goToSlide(prevIndex, "prev");
    currentIndex = prevIndex;
    resetTimer();
}

function resetTimer() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, 5000);
}

function createDots() {
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "store-carousel-dots";

    featuredGames.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "store-carousel-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => {
            const direction = i > currentIndex ? "next" : "prev";
            goToSlide(i, direction);
            currentIndex = i;
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    });

    // Insert dots below the scroll content
    const storeFeatured = document.querySelector(".store-featured");
    storeFeatured.appendChild(dotsContainer);
}

function addArrowListeners() {
    const leftArrow = document.querySelector(".store-scroll-left");
    const rightArrow = document.querySelector(".store-scroll-right");
    if (leftArrow) {
        leftArrow.style.cursor = "pointer";
        leftArrow.addEventListener("click", prev);
    }
    if (rightArrow) {
        rightArrow.style.cursor = "pointer";
        rightArrow.addEventListener("click", next);
    }
}

function addTransitionStyle() {
    const content = document.querySelector(".store-scroll-content");
    if (content) {
        content.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    }

    const style = document.createElement("style");
    style.textContent = `
        .store-carousel-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 8px;
        }
        .store-carousel-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #4a6a80;
            border: none;
            padding: 0;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
        }
        .store-carousel-dot.active {
            background: #c6d4df;
            transform: scale(1.3);
        }
        .store-scroll-left:hover,
        .store-scroll-right:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    addTransitionStyle();
    createDots();
    addArrowListeners();
    autoplayTimer = setInterval(next, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".discount-page");
    const dots = document.querySelectorAll(".discount-dot");
    let current = 0;

    function goTo(index) {
        current = (index + pages.length) % pages.length;
        pages.forEach((p, i) => {
            p.style.transform = `translateX(${(i - current) * 100}%)`;
        });
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    // Set initial positions
    pages.forEach((p, i) => p.style.transform = `translateX(${i * 100}%)`);

    document.querySelector(".discount-arrow-left").addEventListener("click", () => goTo(current - 1));
    document.querySelector(".discount-arrow-right").addEventListener("click", () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
});


// Trending carousel
function initTrending() {
    const allCards = [...document.querySelectorAll(".trending-card")];
    const track = document.querySelector(".trending-track");
    const dotsContainer = document.querySelector(".trending-dots-container");
    let trendingCurrent = 0;
    let pages = [];

    function cardsPerPage() {
        if (window.innerWidth < 450) return 1;
        if (window.innerWidth < 675) return 2;
        if (window.innerWidth < 900) return 3;
        return 4;
    }

    function buildPages() {
        const perPage = cardsPerPage();
        track.innerHTML = "";
        dotsContainer.innerHTML = "";
        pages = [];
        trendingCurrent = 0;

        for (let i = 0; i < allCards.length; i += perPage) {
            const page = document.createElement("div");
            page.className = "trending-page";
            page.style.gridTemplateColumns = `repeat(${perPage}, 1fr)`;
            allCards.slice(i, i + perPage).forEach(card => page.appendChild(card));
            track.appendChild(page);
            pages.push(page);

            const dot = document.createElement("button");
            dot.className = "trending-dot" + (i === 0 ? " active" : "");
            dot.addEventListener("click", () => goToTrending(pages.indexOf(page)));
            dotsContainer.appendChild(dot);
        }

        pages.forEach((p, i) => p.style.transform = `translateX(${i * 100}%)`);
    }

    function goToTrending(index) {
        trendingCurrent = (index + pages.length) % pages.length;
        pages.forEach((p, i) => {
            p.style.transform = `translateX(${(i - trendingCurrent) * 100}%)`;
        });
        dotsContainer.querySelectorAll(".trending-dot").forEach((d, i) => {
            d.classList.toggle("active", i === trendingCurrent);
        });
    }

    document.querySelector(".trending-arrow-left").addEventListener("click", () => goToTrending(trendingCurrent - 1));
    document.querySelector(".trending-arrow-right").addEventListener("click", () => goToTrending(trendingCurrent + 1));

    buildPages();

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildPages, 150);
    });
}

document.addEventListener("DOMContentLoaded", initTrending);