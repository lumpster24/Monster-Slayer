new Vue({
  el: '#app',
  data: {
    gameStart: false,
    you: 100,
    monster: 100,
    logs: []
  },
  methods: {
    handleNewGameClick() {
      this.gameStart = true
      this.you = 100
      this.monster = 100
      this.logs = []
    },
    handleAttack({ isSpecial }) {
      const attackModifier = isSpecial ? 10 : 1
      const yourAttack = Math.floor(Math.random() * 10) + attackModifier
      this.monster -= yourAttack
      this.logs.unshift({
        text: `You hit the Monster for ${yourAttack} HP`,
        class: 'player-turn'
      })
      
      if (this.isGameOver()) {
        return
      }

      this.handleMonsterTurn()
    },
    handleHeal() {
      const heal = 10
      this.you += heal

      this.logs.unshift({
        text: `You healed yourself for ${heal} HP`,
        class: 'player-turn'
      })

      this.handleMonsterTurn()
    },
    handleMonsterTurn() {
      const monsterAttack = Math.floor(Math.random() * 10) + 1
      this.you -= monsterAttack
      this.logs.unshift({
        text: `The Monster hit You for ${monsterAttack} HP`,
        class: 'monster-turn',
      })
      
      if (this.isGameOver()) {
        return
      }
    },
    handleGiveup() {
      this.gameStart = false
    },
    isGameOver() {
      if (this.monster <= 0) {
        alert('You win!')
        this.gameStart = false
        return true
      }

      if (this.you <= 0) {
        alert('You lost... :(')
        this.gameStart = false
        return true
      }

      return false
    }
  }
})