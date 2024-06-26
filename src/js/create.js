name_input = document.querySelector(".address");
location_input = document.querySelector(".location");
bed_input = document.querySelector(".bed");
bath_input = document.querySelector(".bath");
size_input = document.querySelector(".size");
price_input = document.querySelector(".price");
type_input = document.querySelector(".type");
yourNameInput = document.querySelector(".your-name");
imgUrlInput = document.querySelector(".imgLink");
document.querySelector(".submit").addEventListener("click", function () {

    const data = {
        id: self.crypto.randomUUID,
        name: name_input.value,
        location: location_input.value,
        houseImg: imgUrlInput.value,
        type: type_input.value,
        price: price_input.value,
        priceType: "SqFT",
        bed: bed_input.value,
        bath: bath_input.value,
        size: size_input.value,
        user: {
            name: yourNameInput.value,
            photo: "https://themesflat.co/html/homzen/images/avatar/avt-6.jpg"
        }



    }

    fetch("http://localhost:8000/houses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Successfully posted!");

        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
