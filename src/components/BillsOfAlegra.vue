<template>
    <ul >
      <li v-for="(invoice, index) in invoices" :key="index">
        <div class="invoice-card">
          <div class="invoice-header">
            <strong class="seller">{{ invoice.seller.name }}</strong>
            <span class="datetime">{{ formatDate(invoice.datetime) }}</span>
          </div>
          <div class="invoice-details">
            <div class="client">
              <strong>Cliente:</strong> {{ invoice.client.name }}
              <br />
              <strong>ID Cliente:</strong> {{ invoice.client.id }}
              <br />
              <strong>Identificación:</strong>
              {{ invoice.client.identification }}
            </div>
            <div class="items">
              <strong>Items:</strong>
              <ul>
                <li v-for="(item, itemIndex) in invoice.items" :key="itemIndex">
                  {{ item.name }} - Precio: ${{ item.price }} - Cantidad:
                  {{ item.quantity }}
                </li>
              </ul>
            </div>
          </div>
          <div class="total"><strong>Total:</strong> ${{ invoice.total }}</div>
        </div>
      </li>
   </ul>
</template>

<script>
export default {
   props: {
    invoices: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", options);
    },
  },
};
</script>

<style scoped>
.invoice-results {
  margin: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.invoice-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.invoice-header {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.seller {
  font-size: 18px;
}

.datetime {
  font-size: 14px;
}

.invoice-details {
  padding: 20px;
}

.client {
  margin-bottom: 20px;
}

.items {
  margin-bottom: 20px;
}

.total {
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  text-align: right;
}

</style>
