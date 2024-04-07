"use strict"

class CSSBattleSolutions {
  constructor() {
    this.main = document.querySelector("main")

    /* ---------- code section ---------- */
    const code = document.querySelector(".code")

    this.chars = code.querySelector(`.chars`)
    this.code = code.querySelector(`code`)

    /* ---------- preview section ---------- */
    const preview = document.querySelector(".preview")

    const switch_normal = preview.querySelector(".switch .normal")
    switch_normal.addEventListener("click", this.switchToNormal.bind(this))

    const switch_minimal = preview.querySelector(".switch .minimal")
    switch_minimal.addEventListener("click", this.switchToMinimal.bind(this))

    /* ---------- target section ---------- */
    const target = document.querySelector(".target")

    this.match = target.querySelector(".match span")
    this.challenge_link = target.querySelector(".challenge-link")
    this.battle_link = target.querySelector(".battle-link")
    this.target_img = target.querySelector("img")

    /* ---------- choose challenge section ---------- */
    this.chllenges_container = document.querySelector(".challenges")
    this.createChallengesCards()

    /* ---------- change challenge ---------- */
    this.change_challenge = document.querySelector(".change-challenge")
    this.change_challenge.addEventListener("click", () => {
      // prettier-ignore
      switch (this.chllenges_container.hasAttribute("hidden")) {
        case true: this.showChallenges(); break
        case false: this.hideChallenges(); break
      }
    })

    /* ---------- init challenge ---------- */
    this.current_challenge = "#1 simply square"
    this.loadTarget(this.current_challenge)
    this.switchToNormal()
  }

  switchToNormal() {
    this.main.className = "normal"
    this.loadSolution("normal", this.current_challenge)
  }

  switchToMinimal() {
    this.main.className = "minimal"
    this.loadSolution("optimal", this.current_challenge)
  }

  showChallenges() {
    this.chllenges_container.removeAttribute("hidden")
    this.main.setAttribute("hidden", true)
  }

  hideChallenges() {
    this.chllenges_container.setAttribute("hidden", true)
    this.main.removeAttribute("hidden")
  }

  loadTarget(name) {
    const img_link = encodeURIComponent(`Challenges/${name}/target.png`)
    const info_link = encodeURIComponent(`Challenges/${name}/info.txt`)

    this.target_img.src = img_link
    this.target_img.alt = name

    fetch(info_link)
      .then((response) => response.text())
      .then((html) => {
        const text = html.split("\n")

        this.match.innerText = text[0]
        this.challenge_link.href = text[1]
        this.challenge_link.innerText = text[2]
        this.battle_link.href = text[3]
        this.battle_link.innerText = text[4]
      })
      .catch((error) => console.warn(error))
  }

  createChallengesCards() {
    const challange_select = document.querySelector("select")
    const options = challange_select.querySelectorAll("option")

    // prettier-ignore
    const battles_data = [
      ["Battle #1 - Pilot Battle", 0],
      ["Battle #2 - Visibility", 12],
      ["Battle #3 - Cursor", 18],
      ["Battle #4 - Display", 20],
      ["Battle #5 - Inline", 28],
      ["Battle #6 - Conic", 30],
      ["Battle #7 - Backface", 32],
      ["Battle #8 - Transition", 41],
      ["Battle #9 - Margin", 44],
      ["Battle #10 - Block", 46],
      ["Battle #11 - Overflow", 52],
      ["Battle #12 - Blend", 60],
      ["Battle #13 - Clip", 68],
      ["Battle #14 - ZIndex", 76],
      ["Battle #15 - Filter", 80],
      ["Battle #16 - Aspect", 88],
      ["Battle #17 - Christmas 🎄", 96],
      ["Battle #18 - Float", 100],
      ["Battle #19 - Spacing", 108],
      ["Battle #20 - Hover", 116],
      ["Battle #21 - Rotate", 124],
      ["Battle #22 - Grid", 132],
      ["Battle #23 - Contain", 140],
      ["Battle #24 - Offset", 142],
      ["Battle #25 - Flex", 150],
      ["Battle #26 - Initial", 158],
      ["Battle #27 - Relative", 166],
      ["Battle #28 - Revert", 170],
      ["Battle #29 - Font", 178],
      ["Battle #30 - Gradient", 186],
      ["", 194]
    ]

    let battle_id = 0
    let battle_continer = null

    for (let i = 0; i < options.length; i++) {
      if (i === battles_data[battle_id][1]) {
        const title = document.createElement("div")
        title.className = "title"
        title.innerText = battles_data[battle_id++][0]

        battle_continer = document.createElement("div")
        battle_continer.className = "battle"
        battle_continer.appendChild(title)

        this.chllenges_container.appendChild(battle_continer)
      }

      const img_link = encodeURIComponent(`Challenges/${options[i].value}/target.png`)

      const challenge = document.createElement("div")
      challenge.className = "challenge"

      if (options[i].disabled) challenge.setAttribute("disabled", true)
      else {
        challenge.addEventListener("click", () => {
          this.current_challenge = options[i].value
          this.loadTarget(this.current_challenge)
          this.switchToNormal()
          this.hideChallenges()
        })
      }

      const img = document.createElement("img")
      img.src = img_link
      img.alt = options[i].value
      challenge.appendChild(img)

      const number = document.createElement("div")
      number.className = "number"
      number.innerText = `#${i + 1}`
      challenge.appendChild(number)

      battle_continer.appendChild(challenge)
    }
  }

  loadSolution(type, name) {
    const link = encodeURIComponent(`Challenges/${name}/${type}.html`)

    fetch(link)
      .then((response) => response.text())
      .then((html) => {
        this.chars.innerText = `${html.length - (html.match(new RegExp("\n", "g")) || []).length} characters`

        this.code.textContent = html
        this.code.dataset.highlighted = ""
        hljs.highlightAll()

        const iframe = document.querySelector(`iframe.${type}`)

        if (iframe.src == `http://${location.host}/${link}`) return

        iframe.src = link
        iframe.addEventListener("load", (evt) => {
          iframe.contentDocument.body.style.maxWidth = "400px"
          iframe.contentDocument.body.style.maxHeight = "400px"
          iframe.contentDocument.body.style.overflow = "hidden"
        })
      })
      .catch((error) => console.warn(error))
  }
}

new CSSBattleSolutions()
