"use strict"

const challange_select = document.querySelector("select")
challange_select.addEventListener("change", (evt) => {
  loadTarget(evt.target.value)
  loadSolution("normal", evt.target.value)
  loadSolution("optimal", evt.target.value)
})

loadSolution("normal", "#1 simply square")
loadSolution("optimal", "#1 simply square")
loadTarget("#1 simply square")

function loadSolution(type, name) {
  const link = encodeURIComponent(`challenges/${name}/${type}.html`)

  fetch(link)
    .then((response) => response.text())
    .then((html) => {
      const chars = document.querySelector(`.${type} .chars`)
      const code = document.querySelector(`.${type} code`)
      const iframe = document.querySelector(`.${type} iframe`)

      chars.innerText = html.length - (html.match(new RegExp("\n", "g")) || []).length

      const style = document.createElement("style")
      style.innerText = "body{width:400px;height:300px;overflow:hidden}"

      code.innerText = html
      iframe.src = link
      iframe.contentDocument.body.appendChild(style)
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
      const challenge_link = document.querySelector(".target .challenge-link")
      const battle_link = document.querySelector(".target .battle-link")

      match.innerText = text[0]
      challenge_link.href = text[1]
      challenge_link.innerText = text[2]
      battle_link.href = text[3]
      battle_link.innerText = text[4]
    })
    .catch((error) => console.warn(error))
}
