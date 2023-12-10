<template>
 
    <ul>
      <li
        v-for="seller in sellersOfAlegra"
        :key="seller.id"
        @click="showSellerDetails(seller)"
      >
        <strong :class="{ hovered: isHovered }">{{ seller.name }}</strong>
        <span class="pointsContent">
          Puntos Faltantes: {{ 20 - seller.points || 0 }}</span
        >
        <span class="pointsContent">Puntos: {{ seller.points || 0 }} / </span>
        <div class="progress-bar-container">
          <div
            class="progress-bar"
            :style="{ width: calculateProgressBarWidth(seller.points) }"
          ></div>
        </div>
      </li>
    </ul>
 
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: {
    sellersOfAlegra: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    calculateProgressBarWidth(points) {
      const maxWidth = 100;
      const pointsValue = points || 0;
      const width = (pointsValue / 20) * maxWidth;
      return `${width}%`;
    },
    showSellerDetails(seller) {
      const name = seller.name
        ? `<strong>Nombre:</strong> ${seller.name}<br>`
        : "";
      const pointsFaltantes = seller.points
        ? `<strong>Puntos Faltantes:</strong> ${20 - seller.points}<br>`
        : "";
      const points = seller.points
        ? `<strong>Puntos:</strong> ${seller.points}<br>`
        : "";
      const identification = seller.identification
        ? `<strong>Identificación:</strong> ${seller.identification}<br>`
        : "";
      const observations = seller.observations
        ? `<strong>Observación:</strong> ${seller.observations}<br>`
        : "";

      const htmlContent = `${name}${pointsFaltantes}${points}${identification}${observations}`;

      Swal.fire({
        title: "Detalles del Vendedor",
        html: htmlContent,
        icon: "info",
        confirmButtonText: "Cerrar",
      });
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
}

li:hover strong {
  color: #4caf50;
}

.progress-bar-container {
  height: 10px;
  background-color: #eee;
  margin-top: 5px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
}

.pointsContent {
  float: right;
}

.hovered {
  color: #4caf50;
}
</style>
