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
  // console.log(`switched to ${theme} theme`)
}
//body

// option for selecting the sort in admin panel

document.getElementById("sortSelect").addEventListener("change", function () {
  const isAscending = this.value === "0"
  const userItems = Array.from(document.querySelectorAll(".grid-item"))

  userItems.sort((a, b) => {
    const userAId = a.querySelector(".flex-item-2").textContent
    const userBId = b.querySelector(".flex-item-2").textContent
    return isAscending
      ? userAId.localeCompare(userBId)
      : userBId.localeCompare(userAId)
  })

  const gridContainer = document.getElementById("gridContainer")
  gridContainer.querySelectorAll(".grid-item").forEach((item) => item.remove()) // Clear existing items
  userItems.forEach((item) => gridContainer.appendChild(item)) // Append sorted items

  //admin.create suer
})
let addUserButton = document.querySelector(".adduser")
let isAddingUser = false

addUserButton.addEventListener("click", function (event) {
  event.preventDefault()
  if (!isAddingUser) {
    const gridContainer = document.getElementById("gridContainer")
    const userCount = gridContainer.querySelectorAll(".grid-item").length
    const newUser = document.createElement("div")
    newUser.classList.add("grid-item")
    newUser.innerHTML = `
    <form action='/signup' method= "POST">
      <div class="flex-item-1 flex-item">${userCount + 1}</div>
      <div class="flex-item-2 flex-item">User id</div>
      <div class="flex-item-3 flex-item"><input type="text" name="name" placeholder="Name"></div>
      <div class="flex-item-4 flex-item"><input type="text" name="email" placeholder="Email"></div>
      <div class="flex-item-5 flex-item">
        <input type="text" name="password" placeholder="Password">
        <button type="submit">&check;</button>
      </div>
      </form>
    `
    gridContainer.appendChild(newUser) // Changed from insertBefore to appendChild
    this.textContent = "Cancel"
    isAddingUser = true
  } else {
    const gridItems = document.querySelectorAll(".grid-item")
    gridItems[gridItems.length - 1].remove()
    this.textContent = "Add User"
    isAddingUser = false
  }
})

//editing algorith
document.querySelectorAll(".edit-svg a").forEach((editLink) => {
  editLink.addEventListener("click", function (event) {
    event.preventDefault()
    const gridItem = this.closest(".grid-item")
    const nameElement = gridItem.querySelector(".flex-item-3")
    const emailElement = gridItem.querySelector(".flex-item-4")
    const userIdElement = gridItem.querySelector("#userID") // Changed to directly target the userId element within the gridItem

    // Create form elements
    const nameInput = document.createElement("input")
    nameInput.type = "text"
    nameInput.value = nameElement.textContent
    nameInput.name = "name"

    const emailInput = document.createElement("input")
    emailInput.type = "text"
    emailInput.value = emailElement.textContent
    emailInput.name = "email"
    emailInput.style.marginLeft = "10px"
    emailInput.style.marginRight = "10px"

    let userId = userIdElement.textContent // Changed to get userId from the element within the gridItem
    console.log(userId)
    const form = document.createElement("form")
    form.action = `/admin/home/editUser?=${userId}` // Assuming there's a route to handle the edit
    form.method = "POST"

    const submitButton = document.createElement("button") // Changed to create a new button instead of reusing an existing one
    submitButton.type = "submit"
    const img = document.createElement("img")
    img.src = "/icons/tick.png"
    img.alt = "Submit"
    submitButton.appendChild(img)

    form.appendChild(nameInput)
    form.appendChild(emailInput)
    form.appendChild(submitButton) // Add a submit button next to the form fields

    nameElement.textContent = ""
    emailElement.textContent = ""

    nameElement.appendChild(nameInput)
    emailElement.appendChild(form) // Changed to append the form including the submit button next to the email input
  })
})
