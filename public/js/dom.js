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
    // Redirect to entry page or logout user session
    window.location.href = "/logout"
  }

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  }
})

// Theme switch

const themeButton = document.querySelector(".theme")
const body = document.body

// Apply the cached theme on reload
const theme = localStorage.getItem("theme")

if (theme) {
  body.classList.add(theme)
}

// Button Event Handler
let flag = 0
console.log(flag)
themeButton.onclick = () => {
  body.classList.toggle("light")
  body.classList.toggle("dark")
  const theme = body.classList.contains("dark") ? "dark" : "light"
  localStorage.setItem("theme", theme)
  console.log(`switched to ${theme} theme`)
}
//body


// Check if session is valid on page load
