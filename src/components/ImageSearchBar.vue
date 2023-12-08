<template>
  <input type="text">
  {{model}}
</template>

<script>
export default {
 /*  data(){
    return {
      brand: "Audi",
      model: "a4x",
      color: "azul",
    };
  }, */
  setup(){
    const model = "audi";
    return{
      model,
    }
  }
};
</script>

<style>

</style>