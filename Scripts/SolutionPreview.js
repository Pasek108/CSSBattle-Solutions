"use strict"

class SolutionPreview {
  constructor(challenges_data) {
    this.challenges_data = challenges_data

    this.container = document.querySelector(".solution-preview")

    this.challenges_list = new ChallengesList(challenges_data, this)

    /* ---------- preview section ---------- */
    const preview = document.querySelector(".preview")

    const switch_normal = preview.querySelector(".switch .normal")
    switch_normal.addEventListener("click", this.switchToNormal.bind(this))

    const switch_minimal = preview.querySelector(".switch .minimal")
    switch_minimal.addEventListener("click", this.switchToMinimal.bind(this))

    /* ---------- target section ---------- */
    const target = document.querySelector(".target")
    this.target_img = target.querySelector("img")
    this.challenge_link = target.querySelector(".challenge-link")
    this.battle_link = target.querySelector(".battle-link")
    this.match = target.querySelector(".match span")

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

    const iframe = document.querySelector(`iframe.${type}`)
    if (iframe.src == link) return

    const code_container = document.querySelector(`.code.${type} code`)
    const chars_counter = document.querySelector(`.code.${type} .chars`)

    fetch(link)
      .then((response) => response.text())
      .then((solution_code) => {
        const new_lines = solution_code.match(new RegExp("\n", "g")) || []
        chars_counter.innerText = `${solution_code.length - new_lines.length} characters`

        code_container.textContent = solution_code
        code_container.dataset.highlighted = ""
        hljs.highlightElement(code_container)

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
