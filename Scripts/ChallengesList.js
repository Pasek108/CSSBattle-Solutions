"use strict"

class ChallengesList {
  constructor(challenges_data, solution_preview) {
    this.challenges_data = challenges_data
    this.solution_preview = solution_preview

    this.container = document.querySelector(".challenges-list")
    this.show_challenges = document.querySelector(".show-challenges")
    this.show_challenges.addEventListener("click", this.toggleChallenges.bind(this))

    this.toggleChallenges()
    this.createChallengesList()
  }

  toggleChallenges() {
    if (this.container.hasAttribute("hidden")) {
      this.container.removeAttribute("hidden")
      this.solution_preview.container.setAttribute("hidden", true)
    } else {
      this.container.setAttribute("hidden", true)
      this.solution_preview.container.removeAttribute("hidden")
    }
  }

  createChallengesList() {
    const battles = challenges_data.battles
    const challenges = challenges_data.challenges

    for (let i = 0; i < battles.length; i++) {
      const battle_continer = this.createBattleContainer(battles[i])

      for (let j = 0; j < battles[i].challenges.length; j++) {
        const challenge_id = battles[i].challenges[j] - 1
        const challenge_card = this.createChallengeCard(challenges[challenge_id])
        battle_continer.appendChild(challenge_card)
      }

      this.container.appendChild(battle_continer)
    }
  }

  createBattleContainer(battle) {
    const battle_continer = document.createElement("div")
    battle_continer.className = "battle-container"

    const title = document.createElement("div")
    title.className = "title"
    title.innerText = battle.name
    battle_continer.appendChild(title)

    return battle_continer
  }

  createChallengeCard(challenge) {
    const challenge_card = document.createElement("div")
    challenge_card.className = "challenge-card"

    if (!challenge.solved) challenge_card.setAttribute("disabled", true)
    else challenge_card.addEventListener("click", () => this.solution_preview.loadPreview(challenge))

    const img = document.createElement("img")
    img.src = challenge.target_img_link
    img.alt = challenge.name
    challenge_card.appendChild(img)

    const number = document.createElement("div")
    number.className = "number"
    number.innerText = `#${challenge.id}`
    challenge_card.appendChild(number)

    return challenge_card
  }
}
