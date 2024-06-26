forRent = document.querySelector(".forRent");
forSale = document.querySelector(".forSale");

forRent.style.backgroundColor = "white"
forRent.addEventListener("click", () => {
    forRent.style.backgroundColor = "white"
    forSale.style.backgroundColor = "#e3e3e3"
})

forSale.addEventListener("click", () => {
    forSale.style.backgroundColor = "white"
    forRent.style.backgroundColor = "#e3e3e3"
})

setInterval(() => {
    let element = document.querySelector(".safe-house");
    if (element.textContent === "Safe House") {
        element.textContent = "Sanctuary";
    } else {
        element.textContent = "Safe House";
    }
}, 4000);

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animate-opacity');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
});


document.querySelectorAll(".team-card").forEach((el) => {
    el.addEventListener("mouseover", () => {

        el.querySelector(".social-media").style.transform = "translateY(-50%)"
        el.querySelector(".social-media").style.opacity = "100"
        el.querySelector(".contact").style.backgroundColor = "#EC2126"
        el.querySelector(".contact").style.color = "white"
        el.querySelector(".contact").style.border = "none"
    })
})

document.querySelectorAll(".team-card").forEach((el) => {
    el.addEventListener("mouseout", () => {
        el.querySelector(".social-media").style.transform = "translateY(0)"
        el.querySelector(".social-media").style.opacity = "0"
        el.querySelector(".contact").style.backgroundColor = "white"
        el.querySelector(".contact").style.color = "black"
        el.querySelector(".contact").style.border = "1px solid black"



    })
})
fetch('http://localhost:8000/cards')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".cities-card");
        data.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            cardDiv.innerHTML = `
            <div class="card-left">
                        <img src="${card.image}">
                    </div>
                    <div class="card-right">
                        <h3>${card.name}</h3>
                        <p>${card.properties} properties</p>
                        <div> <span>Explore Now </span>
                            <i class="fa-solid fa-arrow-right arrow-ico"></i>
                        </div>

                    </div>
                    `;
            container.appendChild(cardDiv);
        });
    })
function deleteData(id) {
    fetch(`http://localhost:8000/houses/${id}`, {
        method: "DELETE"
    }).then(response => response.json()).then(data => console.log(data))
    location.reload()
}


fetch('http://localhost:8000/houses')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".properties-main-div");
        data.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('properties-card');
            cardDiv.innerHTML = `
              <div class="properties-card">
                    <div class="properties-card-top">
                        <div class="img-top">
                            <div class="img-top-left">
                                <div class="img-top-left-up">
                                    <button class="featured">
                                        <p>FEATURED</p>
                                    </button>
                                    <button class="for-sale">
                                        <p>FOR SALE</p>
                                    </button>
                                </div>
                                <div class="studio-btn-div">
                                    <button><p>${card.type.toUpperCase()}</p></button></div>
                            </div>
                            <div class="img-top-right">
                                <button><i class="fa-solid fa-arrow-right-arrow-left"></i></button>
                                <button><i class="fa-regular fa-heart"></i></button>
                                <button><i class="fa-regular fa-eye"></i></button>
                                <button class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
                            </div>

                        </div>
                        <img src="${card.houseImg}">

                    </div>

                    <div class="properties-card-bottom">
                        <div class="card-bottom-content">
                            <div>
                                <p>${card.name}</p>
                            </div>
                            <div>
                                <i class="fa-solid fa-location-dot"></i>
                                <p>
                                    ${card.location}</p>
                            </div>
                        </div>
                        <div class="card-bottom-info">
                            <span><i class="fa-solid fa-bed"></i>
                                <p>${card.bed}</p>
                            </span>
                            <span><i class="fa-solid fa-bath"></i>
                                <p>${card.bath}</p>
                            </span>
                            <span><i class="fa-solid fa-ruler"></i>
                                <p>${card.size} SqFT</p>
                            </span>
                        </div>
                        <div class="card-bottom-user">
                            <div class="user-info">
                                <img src="${card.user.photo}">
                                <p>${card.user.name}</p>
                            </div>
                            <div class="price-div">
                                <h4>$${card.price},00</h4>
                                <p>/</p>
                                <h5>${card.priceType}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                    `;
            container.appendChild(cardDiv);

            const deleteBtn = cardDiv.querySelector('.deleteBtn');
            deleteBtn.addEventListener("click", () => {
                deleteData(card.id)
            })
        });
    })



window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY; // Sayfanın yukarısından olan kaydırma mesafesi
    var documentHeight = document.documentElement.scrollHeight; // Dokümanın toplam yüksekliği
    var windowHeight = window.innerHeight; // Pencerenin yüksekliği
    var scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    var progress = document.querySelector(".progress")
    progress.style.background = `conic-gradient(#EC2126 ${scrollPercentage * 3.6}deg, #ededed 0deg)`
    progress.style.transform = "translateY(0)"
    progress.style.opacity = "100"
    if (scrollPercentage < 2) {
        progress.style.transform = "translateY(80px)"
        progress.style.opacity = "0"
    }
});
document.querySelector(".progress").addEventListener("click", () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
})
