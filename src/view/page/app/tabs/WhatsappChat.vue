<template>
  <WhatsaapApp />
  <navBarApp />


  <div class="body-container">
        <div>
            EM CONSTRUÇÃO........
        </div>

</div>

</template>
  
<script>

import WhatsaapApp from '../../../../components/whatsappApp/WhatsappApp.vue';
import navBarApp from '../../../../components/widgets/navBarApp/navbarApp.vue';

export default {
  data: {
    htmlCode: '<h1>Título</h1><p>Parágrafo de exemplo</p>',
  },
  components: {
    WhatsaapApp,
    navBarApp,
  },
  computed: {
    compiledHtml: function () {
      return this.htmlCode;
    }
  },
}
</script>

<style scoped>
.body-container {
  /* background: green; */
  position: fixed;
  left: 120px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body-container h1 {
  font-size: 2.5rem;

}
</style>