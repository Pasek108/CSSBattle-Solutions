"use strict"

class ChallengesData {
  constructor(challenges_data, battles_data) {
    this.challenges_data = challenges_data
    this.battles_data = battles_data

    this.generateChallengesData()
    this.generateBattlesData()
    this.joinChallengesAndBattles()
  }

  generateChallengesData() {
    this.challenges = []

    for (let i = 0; i < this.challenges_data.length; i++) {
      const data = this.challenges_data[i]

      const id = i + 1
      const solved = data[0] == 1
      const folder_name = data[1]
      const match_precentage = data[2]

      const host_link = location.href.split("/").slice(0, -1).join("/")
      const target_img_link = `${host_link}/Challenges/${folder_name}/target.png`
      const normal_solution_link = `${host_link}/Challenges/${folder_name}/normal.html`
      const minimal_solution_link = `${host_link}/Challenges/${folder_name}/minimal.html`
      const challenge_link = `https://cssbattle.dev/play/${i + 1}`

      let name = folder_name.split("_")
      name[0] = `#${name[0]}.`
      name = name.join(" ")

      this.challenges.push({
        id,
        name,
        solved,
        match_precentage,
        target_img_link,
        normal_solution_link,
        minimal_solution_link,
        challenge_link,
      })
    }
  }

  generateBattlesData() {
    this.battles = []

    for (let i = 0; i < this.battles_data.length; i++) {
      const data = this.battles_data[i]

      const id = i + 1
      const name = data[0]
      const last_challenge_id = data[1]
      const battle_link = `https://cssbattle.dev/battle/${i + 1}`

      this.battles.push({
        id,
        name,
        last_challenge_id,
        battle_link,
        challenges: [],
      })
    }
  }

  joinChallengesAndBattles() {
    let battle_id = 0

    for (let i = 0; i < this.challenges.length; i++) {
      let battle = this.battles[battle_id]
      let challenge = this.challenges[i]

      if (challenge.id > battle.last_challenge_id) {
        battle_id++
        battle = this.battles[battle_id]
      }

      challenge.battle = battle.id
      battle.challenges.push(challenge.id)
    }
  }
}
