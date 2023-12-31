"use strict"

const challange_select = document.querySelector("select")
challange_select.addEventListener("change", (evt) => {
  loadTarget(evt.target.value)
  loadSolution("normal", evt.target.value)
  main.className = "normal"
})

const main = document.querySelector("main")

const switch_normal = document.querySelector(".switch .normal")
switch_normal.addEventListener("click", () => {
  main.className = "normal"
  loadSolution("normal", challange_select.value)
})

const switch_minimal = document.querySelector(".switch .minimal")
switch_minimal.addEventListener("click", () => {
  main.className = "minimal"
  loadSolution("optimal", challange_select.value)
})

main.className = "normal"
loadSolution("normal", "#1 simply square")
loadTarget("#1 simply square")

function loadSolution(type, name) {
  const link = encodeURIComponent(`challenges/${name}/${type}.html`)

  fetch(link)
    .then((response) => response.text())
    .then((html) => {
      const chars = document.querySelector(`.chars`)
      chars.innerText = `${html.length - (html.match(new RegExp("\n", "g")) || []).length} characters`

      const code = document.querySelector(`.code code`)
      code.innerText = html

      const iframe = document.querySelector(`iframe.${type} `)
      iframe.src = link
      iframe.addEventListener("load", (evt) => {
        iframe.contentDocument.body.style.width = "400px"
        iframe.contentDocument.body.style.height = "300px"
        iframe.contentDocument.body.style.overflow = "hidden"
      })
    })
    .catch((error) => console.warn(error))
}

function loadTarget(name) {
  const img_link = encodeURIComponent(`challenges/${name}/target.png`)
  const info_link = encodeURIComponent(`challenges/${name}/info.txt`)

  const img = document.querySelector(".target img")
  img.src = img_link
  img.alt = name

  fetch(info_link)
    .then((response) => response.text())
    .then((html) => {
      const text = html.split("\n")

      const match = document.querySelector(".target .match span")
      match.innerText = text[0]

      const challenge_link = document.querySelector(".target .challenge-link")
      challenge_link.href = text[1]
      challenge_link.innerText = text[2]

      const battle_link = document.querySelector(".target .battle-link")
      battle_link.href = text[3]
      battle_link.innerText = text[4]
    })
    .catch((error) => console.warn(error))
}
