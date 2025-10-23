let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");
const popup = document.getElementById("popup");
const popupMsg = document.getElementById("popup-message");

// Menu toggle
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Scroll active link
window.onscroll = () => {
  let top = window.scrollY;
  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navlinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch("submit_form.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      showPopup("✅ Message sent successfully!");
      this.reset(); // clear form
    })
    .catch(() => {
      showPopup("❌ Something went wrong!");
    });
});

// Function to show popup with fade-out
function showPopup(message) {
  popupMsg.textContent = message;
  popup.classList.add("show");

  // Hide after 3 seconds
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}
