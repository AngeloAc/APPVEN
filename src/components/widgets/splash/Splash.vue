<template>
  <div class="splash-screen">
    <div>
      <p class="logo">{{ displayText }}</p>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullText: 'STARTIC.ai',
      displayText: '',
      currentIndex: 0,
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      if (this.currentIndex < this.fullText.length) {
        this.displayText += this.fullText[this.currentIndex];
        this.currentIndex++;
        setTimeout(this.typeText, 200); // Adiciona um atraso de 200ms entre cada letra
      } else {
        // Quando toda a palavra foi digitada, emite o evento 'splash-screen-loaded'
        this.$emit('splash-screen-loaded');
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para o splash screen */
.splash-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #ffffff; */
}

.logo {
  font-size: 30px;
  color: green;
}

</style>
