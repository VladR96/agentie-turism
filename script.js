const root = document.getElementById("root");
const content = document.getElementById("content");
const videosPerPage = {
  Grecia: "img/Grec.mp4",
  Egipt: "img/Egip.mp4",
  Turcia: "img/turc.mp4",
  Bulgaria: "img/bulg.mp4",
  Albania: "img/alba.mp4",
  Muntenegru: "img/munte.mp4",
};

async function getHotel(country) {
  const response = await fetch(
    `https://apex.oracle.com/pls/apex/vlad_renita/api/hotels/${country}`
  );
  const data = await response.json();
  return data.items;
}

function renderVideo(country) {
  const videoElement = document.createElement("video");
  const sourceElement = document.createElement("source");
  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.muted = true;
  videoElement.id = "video-background";
  sourceElement.src = videosPerPage[country];
  sourceElement.type = "video/mp4";
  videoElement.appendChild(sourceElement);
  root.appendChild(videoElement);
}

function renderHero(country) {
  const heroElement = document.createElement("div");
  heroElement.classList.add("hero");
  heroElement.innerHTML = `
        <h1>Bine ai venit în ${country}</h1>
        <p>Aici vei descoperi frumusețea țării și atracțiile ei minunate.</p>
    `;
  content.appendChild(heroElement);
}

function renderNoHotels() {
  const noHotelsElement = document.createElement("p");
  noHotelsElement.classList.add("no-hotels");
  noHotelsElement.innerText = "Nu există hoteluri disponibile.";
  content.appendChild(noHotelsElement);
}

async function renderHotels(country) {
  renderVideo(country);
  renderHero(country);
  const hotels = await getHotel(country);
  if (hotels.length === 0) {
    renderNoHotels();
    return;
  }
  const hotelsElement = document.createElement("ul");
  hotelsElement.classList.add("hotels-list");
  hotels.forEach((hotel) => {
    const hotelElement = document.createElement("li");
    hotelElement.classList.add("hotel-card");

    hotelElement.innerHTML = `
                 <div>
                <img src="data:image/png;base64,${hotel.imagine}" alt="${hotel.nume}">
                <div class="hotel-info">
                <div class="title">
                <h2>${hotel.nume}</h2>
                <p>${hotel.stele} stele</p>
                </div>
                </div>
                <div class="features">
                <p>Jacuzzi: ${hotel.jacuzzi}</p>
                <p>Minibar: ${hotel.minibar}</p>
                </div>
                <div class="price">
                <p>Preț:${hotel.pret} Euro</p>
                <a href="book.html?hotel=${hotel.nume}">Rezervă</a>
                </div>
                </div>
        `;
    hotelsElement.appendChild(hotelElement);
  });
  content.appendChild(hotelsElement);
}

const urlSearchParams = new URLSearchParams(window.location.search);

renderHotels(urlSearchParams.get("country"));
