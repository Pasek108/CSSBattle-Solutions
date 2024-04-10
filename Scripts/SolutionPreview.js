"use strict"

class SolutionPreview {
  constructor(challenges_data) {
    this.challenges_data = challenges_data

    this.container = document.querySelector(".solution-preview")

    this.challenges_list = new ChallengesList(challenges_data, this)

    /* ---------- code section ---------- */
    const code_section = document.querySelector(".code")
    this.chars = code_section.querySelector(`.chars`)
    this.code = code_section.querySelector(`code`)

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

    /* ---------- init challenge ---------- */
    this.current_challenge = this.challenges_data.challenges[0]
    this.loadPreview(this.current_challenge)
  }

  switchToNormal() {
    this.container.className = "solution-preview show-normal"
    this.loadSolution("normal")
  }

  switchToMinimal() {
    this.container.className = "solution-preview show-minimal"
    this.loadSolution("minimal")
  }

  loadPreview(challenge) {
    this.current_challenge = challenge

    this.loadTarget(challenge)
    this.loadSolution("minimal")
    this.switchToNormal()

    this.challenges_list.toggleChallenges()
  }

  loadTarget(challenge) {
    this.target_img.src = challenge.target_img_link

    this.challenge_link.href = challenge.challenge_link
    this.challenge_link.innerText = challenge.name

    const battle = this.challenges_data.battles[challenge.battle - 1]
    this.battle_link.href = battle.battle_link
    this.battle_link.innerText = battle.name.split("-")[0]

    this.match.innerText = challenge.match_precentage
  }

  loadSolution(type) {
    const challenge = this.current_challenge
    const link = type == "normal" ? challenge.normal_solution_link : challenge.minimal_solution_link

    fetch(link)
      .then((response) => response.text())
      .then((html) => {
        this.chars.innerText = `${html.length - (html.match(new RegExp("\n", "g")) || []).length} characters`

        this.code.textContent = html
        this.code.dataset.highlighted = ""
        hljs.highlightAll()

        const iframe = document.querySelector(`iframe.${type}`)

        if (iframe.src == link) return

        iframe.src = link
        iframe.addEventListener("load", (evt) => {
          iframe.contentDocument.body.style.maxWidth = "400px"
          iframe.contentDocument.body.style.maxHeight = "300px"
          iframe.contentDocument.body.style.overflow = "hidden"
        })
      })
      .catch((error) => console.warn(error))
  }
}
