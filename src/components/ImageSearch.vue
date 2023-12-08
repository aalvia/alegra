<template>
  <h1>Ingrese imagen que necesita</h1>

  <input type="text" id="searchInput" placeholder="Ingresar solicitud de imagen" />
  <button class="b-Search" @click="searchImages">Buscar</button>

  <div> 
    <div v-if="imagesOfSellers.length > 0">
      <div
        class="imageSelector"
        v-for="(seller, index) in sellersOfAlegra"
        :key="index"
      >
        <img class="sellerImage" :src="imagesOfSellers[index]" alt="" @click="showImage(index)" />
        <br />
        <span class="s-points" v-if="seller.points">{{ seller.points }}</span>
        <button @click="comprar(index)">Comprar</button>
        <br /><span> {{ seller.name }}</span>
      </div>
    </div>
  </div>
  <div id="imageResults"></div>
  <!-- {{sellersOfAlegra}}
  
{{pointsOf}} -->
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: {
    sellersOfAlegra: {
      type: Array,
      default: () => [],
    },
    pointsOf: {
      type: Object, // Cambiado a Object
      default: () => ({ value: 0 }), // Ahora es un objeto con una propiedad "value"
    },
    imagesOfSellers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      imagesOfSellersTemp: [],
    };
  },

  methods: {
    searchImages() {
      this.imagesOfSellersTemp = [];
      const apiKey = "AIzaSyCmvJrEP-QE3P_KRkAqfqeLZ47lH_OXvl0"; 
      const cx = "01d3f4967ced54f34"; 
      const searchQuery = document.getElementById("searchInput").value;
      const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${apiKey}&cx=${cx}&searchType=image`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const imageResults = document.getElementById("imageResults");
          if (data.items) {
            data.items.forEach((item) => {
              const imgElement = document.createElement("img");
              imgElement.src = item.link;

              this.imagesOfSellersTemp.push(item.link);

              imgElement.alt = item.title;

              const linkElement = document.createElement("a");
              linkElement.href = item.link;
              linkElement.target = "_blank";
              linkElement.appendChild(imgElement);

              /*   imageResults.appendChild(linkElement); */
            });  this.$emit("updateImageOfSellers", this.imagesOfSellersTemp);
          } else {
            imageResults.innerHTML = "No se encontraron imágenes.";
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    },
 showImage(index) {
      // Muestra la imagen al 100% en SweetAlert
      Swal.fire({
        imageUrl: this.imagesOfSellers[index],
        imageAlt: 'Imagen del vendedor',
      });
    },
    comprar(index) {
      console.log("ejecutando");
      let newPoints = 0;
      // Aumentar la puntuación del vendedor al hacer clic en el botón "comprar"
      if (
        this.sellersOfAlegra[index] &&
        typeof this.sellersOfAlegra[index].points === "number"
      ) {
        // Aumentar la puntuación del vendedor al hacer clic en el botón "comprar"
        newPoints = this.sellersOfAlegra[index].points + 3;
      } else {
        newPoints = 3;
      }

     

      this.$emit("updatePoints", newPoints, index);
      if (newPoints >= 20){
        this.$emit("checkWinner", index);
      }
    },
  },
  components: {},
};
</script>

<style scoped>
.b-Search{
  margin-left: 3px;
}
.sellerImage {
  width: 80%;
  height: auto;
}
.imageSelector {
  width: 23%;
  float: left;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
}

.s-points {
  background-color: yellowgreen;
  margin-right: 2px;
  padding: 3px;
  border-radius: 15px;
}
h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

#searchInput {
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 8px 12px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.imageSelector {
  margin-top: 10px;
  display: inline-block;
  margin-right: 10px;
}

.sellerImage {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 0px solid #ddd;
margin-bottom: 3px;
}




#imageResults {
  margin-top: 20px;
}
body {
  font-family: Arial, sans-serif;
}
.imageSelector:hover {
  transform: scale(1.05);
}
</style>
<style scoped>


</style>
