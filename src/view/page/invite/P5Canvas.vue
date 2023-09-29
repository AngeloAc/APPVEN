<!-- <template>
    <div>
      <h1>Integração p5.js com Vue.js</h1>
      <p>Mouse Pressed: {{ isMousePressed ? 'Sim' : 'Não' }}</p>
      <canvas ref="canvas"></canvas>
      <button id='button'>enter me on you</button>
    </div>
  </template>
  
  <script>

  import p5 from "p5";
  
  export default {
    data() {
      return {
        isMousePressed: false,
      };
    },
    mounted() {
      // Crie uma instância p5 e associe-a ao elemento canvas
      this.p5 = new p5(this.sketch, this.$refs.canvas);
   
    },
    methods: {
      sketch(p) {
        p.setup = () => {
          p.createCanvas(400, 200);
        };
  
        p.draw = () => {
          p.background(220);
        };
  
        p.mousePressed = () => {
          // Atualize o estado do Vue.js quando o mouse for pressionado
          this.isMousePressed = true;
        };
  
        p.mouseReleased = () => {
          // Atualize o estado do Vue.js quando o mouse for liberado
          this.isMousePressed = false;
        };
      },
    },
  };
  </script>
   -->