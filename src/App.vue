<template>
  <div class="f-content">
  
    <div class="titulo">
      <h1>Imágenes del mundo</h1>
    </div>

    <div>
      <div class="container">
        <div class="tabs">
          <button
            @click="changeTab(1)"
            :class="{ activeTab: currentTab === 1 }"
          >
            <font-awesome-icon icon="images" />
          </button>
          <button
            @click="changeTab(2)"
            :class="{ activeTab: currentTab === 2 }"
          >
            <font-awesome-icon :icon="['fas', 'book']" />
          </button>
          <button
            @click="changeTab(3)"
            :class="{ activeTab: currentTab === 3 }"
          >
            <font-awesome-icon :icon="['fas', 'rectangle-list']" />
          </button>
          <button
            @click="changeTab(4)"
            :class="{ activeTab: currentTab === 4 }"
            class="align-right"
          >
            <font-awesome-icon :icon="['fas', 'user-tie']" />
          </button>
        </div>

        <ImageSearch
          v-if="currentTab === 1 && sellersOfAlegra.length > 0"
          :sellersOfAlegra="sellersOfAlegra"
          :pointsOf="pointsOf"
          :imagesOfSellers="imagesOfSellers"
          @updatePoints="updatePoints"
          @checkWinner="checkWinner"
          @updateImageOfSellers="updateImageOfSellers"
        />

 <div  v-if="currentTab === 2 ">
    <h2>Vendedores - Carrera Actual</h2>
      <AlegraSellers
          v-if="currentTab === 2 && sellersOfAlegra.length > 0"
          :sellersOfAlegra="sellersOfAlegra"
          :pointsOf="pointsOf"
        />
     </div>
       

        <BillsOfAlegra
          v-if="currentTab === 3 && sellersOfAlegra.length > 0"
          :sellersOfAlegra="sellersOfAlegra"
          :pointsOf="pointsOf"
        />


        <GestionOfSellers
          v-if="currentTab === 4 && sellersOfAlegra.length > 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ImageSearch from "./components/ImageSearch.vue";
import AlegraSellers from "./components/AlegraSellers.vue";
import BillsOfAlegra from "./components/BillsOfAlegra.vue";
import GestionOfSellers from "./components/GestionOfSellers.vue";
export default {
  data() {
    return {
      menuWidth: 0,
      currentTab: 1,
      sellersOfAlegra: [],
      imagesOfSellers: [],
    };
  },
  created() {
    this.fetchSellersData();
  },
  methods: {
    updateImageOfSellers(newArray) {
      console.log("updateimage");
      this.imagesOfSellers = newArray;
    },
    updatePoints(newPoints, index) {
      console.log("newPoints", newPoints);
      this.sellersOfAlegra[index].points = newPoints;
    },
    checkWinner(index) {
      console.log("checkwin");
      let totalPoints = 0;
      this.sellersOfAlegra[index].isWinner = true;
      for (let i = 0; i < this.sellersOfAlegra.length; i++) {
        if (
          this.sellersOfAlegra[index] &&
          typeof this.sellersOfAlegra[index].points === "number"
        ) {
          totalPoints += this.sellersOfAlegra[i].points || 0;
        }
      }
      this.sellersOfAlegra[index].pointsWinner = totalPoints;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      Swal.fire({
        icon: "success",
        title: "¡Ganador!",
        text: `${this.sellersOfAlegra[index].name} ha ganado con ${totalPoints} puntos`,
      }).then(() => {
        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization:
              "Basic YW5keS5hbHZpYS5pbmdAb3V0bG9vay5jb206NjczZGYxNGJjMDI4NTFmN2U1NzU6YWxlZ3JhYTI=",
          },
          body: JSON.stringify({
            client: { id: 1 },
            items: [
              {
                id: 1,
                name: "imagenes",
                quantity: this.sellersOfAlegra[index].pointsWinner / 3,
                price: 3,
              },
            ],
            dueDate: formattedDate,
            date: formattedDate,
            seller: this.sellersOfAlegra[index].id,
          }),
        };

        fetch("https://api.alegra.com/api/v1/invoices", options)
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));

        this.sellersOfAlegra.forEach((seller) => {
          seller.points = 0;
        });
      });
    },
    openNav() {
      this.menuWidth = 250;
    },
    closeNav() {
      this.menuWidth = 0;
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
    fetchSellersData() {
      this.loading = true;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Basic YW5keS5hbHZpYS5pbmdAb3V0bG9vay5jb206NjczZGYxNGJjMDI4NTFmN2U1NzU6YWxlZ3JhYTI=",
        },
      };

      fetch("https://api.alegra.com/api/v1/sellers", options)
        .then((response) => response.json())
        .then((response) => {
         
          this.sellersOfAlegra = response;
        })
        .catch((err) => console.error(err)).finally(() => {
          this.loading = false; 
        });
    },
  },
  components: {
    ImageSearch,
    AlegraSellers,
    BillsOfAlegra,
    GestionOfSellers,
  },
};
</script>

<style scoped>
.f-content {
  width: 100%;
  height: 100%;
}
.titulo {
  text-align: center;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  overflow: hidden; /* Evita el desplazamiento del cuerpo al abrir el menú */
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 18px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 16px;
  }
}

.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 450px; /* Ajusta según sea necesario */
  height: auto;
}
.tabs {
  display: flex;
}

button {
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  background-color: #f0f0f0;
}

button.activeTab {
  background-color: #ddd;
}
.tabs {
  display: flex;
  justify-content: space-between;
}

.align-right {
  margin-left: auto;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Fondo semi-transparente */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 999; /* Z-index alto para superponerse a otros elementos */
}
</style>
