<template>
  <!-- start header  -->
  <header>
    <div class="navbar">
      <!--start logo -->
      <div class="logo">
        <h3>Logo</h3>
      </div>
      <!-- fim logo  -->
      <!-- menu -->
      <div class="menu">
        <ul>
          <li><a href="">Home</a></li>
          <li><a href="">Sobre nos</a></li>
          <li><a href="">Servicos</a></li>
          <li><a href="" id="action-btn">Falar conosco</a></li>
        </ul>
      </div>
      <!-- fim menu -->
    </div>
  </header>
  <!-- fim header  -->
  <!-- start container -->
  <section>
    <div class="container">
      <!-- start container TEXTO  -->
      <div class="container-texto">
        <p style="letter-spacing: 6px;">A melhor startup de Angola</p>
        <h1>STARTIC</h1>
        <p style="color: gray; letter-spacing: 1px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          eaque voluptate obcaecati suscipit facere quis
          nesciunt explicabo pariatur ipsa voluptatem esse dolorum reprehenderit tenetur iure numquam non, aliquam hic
          nam?</p>
        <div class="get-start-btn">
          <a href="">Get Start</a>
        </div>
      </div>
      <!-- fim container TEXTO  -->
      <!-- start container img  -->
      <div class="container-img">
        <img style="width:100%;" src="../src/assets/img_sat.jpg" alt="">
      </div>
      <!-- fim container img  -->
    </div>
  </section>
  <!-- fim container  -->
  <!-- start Card Views  -->
  <div class="container-card">
    <div>
      <h1>O que podemos fazer pelo seu servico</h1>
    </div>
    <div class="card-list">
      <!-- CARD 1  -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-header-title">Telecomunicacoes</h3>
        </div>
        <hr style="color: gray;">
        <div class="card-conteiner">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores facilis cupiditate tempore quod at
            iusto,
            hic laudantium enim, praesentium nemo quae! In quo reprehenderit rerum tenetur, veniam vel adipisci facere!
          </p>
        </div>
        <div class="card-footer">
          <a href="">saber mais ></a>
        </div>
      </div>
      <!-- CARD 2  -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-header-title">Electronica</h3>
        </div>
        <hr>
        <div class="card-conteiner">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, dolor magni? Nihil beatae rerum suscipit
            officia a perferendis dignissimos totam veniam sed, aspernatur nobis mollitia saepe repellendus nostrum magni
            vero.
          </p>
        </div>
        <div class="card-footer">
          <a href="">saber mais</a>
        </div>
      </div>
      <!-- CARD 3  -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-header-title">Automacao Industrial</h3>
        </div>
        <hr>
        <div class="card-conteiner">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae doloribus fuga, modi tenetur expedita quas
            repellendus aperiam. Eaque, voluptates iste natus ducimus totam veritatis, dolore atque quo, nulla deserunt
            modi.
          </p>
        </div>
        <div class="card-footer">
          <a href="">saber mais</a>
        </div>
      </div>
    </div>
    <!-- fim card-list  -->
  </div>
  <!-- fim Card Views  -->
  <!-- start footer  -->
  <footer>

  </footer>
  <!-- fim footer  -->
</template>

<script>

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto&display=swap');

header {
  /* background: yellow; */
  /* padding-top: 10px; */
  position: sticky;
  top: 0;
  left: 0;
  background: white;
}

.navbar {
  position: relative;
  display: flex;
  flex-flow: row wrap;
  /* background: yellow; */
}

.logo {
  flex: 10%;
  /* border: 1px solid black; */
  padding-left: 10%;
  justify-content: center;
  color: #4e38ce;
}

.menu {
  flex: 50%;
  /* border: 1px solid orange; */
  padding: 10px;
  margin-right: 10%;
  text-align: right;
  align-items: center;

}

.menu ul {
  list-style: none;
  display: inline-flex;
  flex: row wrap;

}

.menu li a {
  text-decoration: none;
  justify-content: space-between;
  margin-left: 15px;

}

.menu a:hover {
  border-bottom: 2px solid orange;
}

#action-btn {
  background: #182929;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
}

#action-btn:hover {
  background: orange;
  border: none;
}

.container {
  padding-top: 20px;
  padding-bottom: 20px;
  /* background: gray; */
  display: flex;
  flex-flow: row wrap;
  flex-grow: 1;
  align-items: center;
  margin: 0;
}

.container-texto {
  /* border: 1px solid red; */
  flex: 40%;
  margin-left: 10%;
  text-align: left;

}

.container-texto h1 {
  letter-spacing: 5px;
  font-size: 35px;
  font-weight: 900;
}

.container-img {
  /* border: 1px solid black; */
  margin-right: 10%;
  flex: 40%;
  width: 100%;
}

.get-start-btn {
  padding-top: 10px;
}

.get-start-btn a {
  text-decoration: none;
  padding: 10px 20px;
  background: orange;
  color: black;
}

.get-start-btn a:hover {
  background: black;
  color: white;
}

.container-card {
  display: flex;
  flex-flow: column;
  /* background: green; */
  text-align: center;
  padding: 10%;
}

.card-list {
  display: flex;
  flex-flow: row wrap;
  flex-grow: 1;
  justify-content: space-between;
}

.card {
  margin-left: 10px;
  flex: 10%;
  border: 1px solid orange;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.card:hover{
  background: orange;
  color: white;
}

.card p {
  text-align: left;
}
.card-footer{
  text-align: left;
}
.card-footer a{
  background: rgb(229, 157, 157);
  color: rgb(47, 44, 44);
  padding: 5px 20px;
  margin-bottom: 5px;
  text-decoration: none;
  border-radius: 5px;
  
}
footer{
  background-image: linear-gradient(180deg, black, black , orange);
  height: 200px;
}

</style>
