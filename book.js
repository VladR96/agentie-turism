const urlSearchParams = new URLSearchParams(window.location.search);
const hotel = urlSearchParams.get("hotel");

const form = document.getElementById("bookForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const booking = {
    numele: formData.get("nume"),
    prenumele: formData.get("prenume"),
    numarul_persoanelor: formData.get("nrPersoane"),
    adulti: formData.get("adulti"),
    copii: formData.get("copii"),
    hotel: hotel,
  };

  const response = await fetch(
    "https://apex.oracle.com/pls/apex/vlad_renita/api/hotel/book",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    }
  );

  if (response.ok) {
    alert("Rezervare efectuată cu succes!");
    form.querySelectorAll("input").forEach((input) => (input.value = ""));
  } else {
    alert("A apărut o eroare. Vă rugăm să încercați din nou.");
  }
});
