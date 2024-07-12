document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu")
  const aside = document.querySelector("aside")

  hamburgerMenu.addEventListener("click", function () {
    aside.classList.toggle("visible")
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal")
  const confirmLogout = document.getElementById("confirmLogout")
  const cancelLogout = document.getElementById("cancelLogout")
  const closeSpan = document.querySelector(".close")
  const logoutLink = document.getElementById("logoutLink")

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault()
      modal.style.display = "block"
    })
  }

  closeSpan.onclick = function () {
    modal.style.display = "none"
  }

  cancelLogout.onclick = function () {
    modal.style.display = "none"
  }

  confirmLogout.onclick = function () {
    modal.style.display = "none"
    // Redirect to login page or logout user session
    window.location.href = "/login"
    // Add your logout logic here
  }

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  }
})

//theme switch

// DOM Elements

const themeButton = document.querySelector(".theme")
const body = document.body

// Apply the cached theme on reload

const theme = localStorage.getItem("theme")

if (theme) {
  body.classList.add(theme)
}

// Button Event Handler

themeButton.onclick = () => {
  console.log("clicked")
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark")
    localStorage.setItem("theme", "dark")
  } else {
    body.classList.replace("dark", "light")
    localStorage.setItem("theme", "light")
  }
}
