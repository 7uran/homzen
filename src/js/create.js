const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");

let button = dropArea.querySelector(".button");
let input = dropArea.querySelector("input");

let file;

button.onclick = () => {
    input.click();
};


input.addEventListener("change", function () {
    file = this.files[0];
    dropArea.classList.add("active");
    displayFile();
});


dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload";

});


dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    // console.log('File left the drag area');
    dragText.textContent = "Drag & Drop";
});


dropArea.addEventListener("drop", (event) => {
    event.preventDefault();


    file = event.dataTransfer.files[0];

    displayFile();
});

let fileurl;
function displayFile() {
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtensions.includes(fileType)) {

        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            fileurl = fileURL;

            let imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File");
        dropArea.classList.remove("active");
    }
}




name_input = document.querySelector(".address");
location_input = document.querySelector(".location");
bed_input = document.querySelector(".bed");
bath_input = document.querySelector(".bath");
size_input = document.querySelector(".size");
price_input = document.querySelector(".price");
type_input = document.querySelector(".type");
yourNameInput = document.querySelector(".your-name")
document.querySelector(".submit").addEventListener("click", function () {
  
    const data = {

        name: name_input.value,
        location: location_input.value,
        houseImg: fileurl,
        type: type_input.value,
        price:price_input.value,
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
