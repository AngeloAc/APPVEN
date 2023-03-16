<template>
  <h1>STARTIC</h1>
  <button class="btn-start" :disabled="isPlaying" @click="start">play</button>
  <Block v-if="isPlaying" :delay="delay" @end="endGame" />
  <p v-if="showScore">A sua reação foi em {{ score }} ms</p>
</template>

<script>
import Block from './components/Block.vue'

export default {
  name: 'App',
  data() {
    return {
      isPlaying: false,
      delay: null,
      score: null,
      showScore: false
    }
  },
  components: { Block },
  methods: {
    start() {
      this.delay = 2000 + Math.random() * 5000;
      this.isPlaying = true;
      this.showScore = false
    },
    endGame(reactionTime) {
      this.isPlaying = false
      this.score = reactionTime;
      this.showScore = true
    }
  },
}
</script>

<style scoped>
.btn-start {
  padding: 10px 40px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
}

.btn-start:hover {
  background: rebeccapurple;
  color: white;
}
.btn-start[disabled]{
    opacity: 0.2;
    cursor: not-allowed;
}
</style>