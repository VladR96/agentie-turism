const countries = [
  {
    id: 1,
    name: "Grecia",
    image: "img/grecia.png",
    href: "countries.html?country=Grecia",
  },
  {
    id: 2,
    name: "Egipt",
    image: "img/egipt.png",
    href: "countries.html?country=Egipt",
  },
  {
    id: 3,
    name: "turcia",
    image: "img/turcia.png",
    href: "countries.html?country=Turcia",
  },
  {
    id: 4,
    name: "Bulgaria",
    image: "img/bulgaria.png",
    href: "countries.html?country=Bulgaria",
  },
  {
    id: 5,
    name: "Albania",
    image: "img/albania.png",
    href: "countries.html?country=Albania",
  },
  {
    id: 6,
    name: "Muntenegru",
    image: "img/muntenegreu.png",
    href: "countries.html?country=Muntenegru",
  },
];

const countriesElement = document.getElementById("countries");

countries.forEach((country) => {
  const countryElement = document.createElement("li");
  countryElement.classList.add("country");
  countryElement.innerHTML = `
        <a href="${country.href}" class="country-card">
            <img src="${country.image}" alt="${country.name}">
        </a>
    `;
  countriesElement.appendChild(countryElement);
});
