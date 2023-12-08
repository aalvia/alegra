<template>
  <div>
    <h2>Vendedores - Carrera Actual</h2> 
    <ul>
      <li v-for="seller in sellersOfAlegra" :key="seller.id" @click="showSellerDetails(seller)">
        <strong :class="{ 'hovered': isHovered }">{{ seller.name }}</strong>
       
        <span class="pointsContent"> Puntos Faltantes: {{ 20 - seller.points || 0 }}</span>
         <span class="pointsContent">Puntos: {{ seller.points || 0 }} / </span>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: calculateProgressBarWidth(seller.points) }"></div>
        </div>
      </li>
    </ul>
  </div>
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
      // Calcula el ancho de la barra de progreso basado en los puntos
      const maxWidth = 100; // Ancho máximo de la barra de progreso
      const pointsValue = points || 0;
      const width = (pointsValue / 20) * maxWidth; // Suponiendo que 1 punto equivale al 10% del ancho
      return `${width}%`;
    },
    showSellerDetails(seller) {
      // Validar campos antes de mostrar los detalles
  const name = seller.name ? `<strong>Nombre:</strong> ${seller.name}<br>` : '';
  const pointsFaltantes = seller.points ? `<strong>Puntos Faltantes:</strong> ${20 - seller.points}<br>` : '';
  const points = seller.points ? `<strong>Puntos:</strong> ${seller.points}<br>` : '';
  const identification = seller.identification ? `<strong>Identificación:</strong> ${seller.identification}<br>` : '';
  const observations = seller.observations ? `<strong>Observación:</strong> ${seller.observations}<br>` : '';

  // Construir el contenido HTML final
  const htmlContent = `${name}${pointsFaltantes}${points}${identification}${observations}`;

  // Muestra los detalles del vendedor utilizando SweetAlert
  Swal.fire({
    title: 'Detalles del Vendedor',
    html: htmlContent,
    icon: 'info',
    confirmButtonText: 'Cerrar',
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
  color: #4caf50; /* Cambiar a tu color deseado */
}

.progress-bar-container {
  height: 10px;
  background-color: #eee;
  margin-top: 5px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50; /* Color verde para la barra de progreso */
}

.pointsContent {
  float: right;
}

.hovered {
  color: #4caf50; /* Cambiar a tu color deseado */
}
</style>