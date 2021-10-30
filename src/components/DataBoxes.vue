<template>
  <div class="grid md:grid-cols-2 gap-4">
    <!-- Box 1 -->
    <div class="shadow-md bg-green-100 p-10 text-center rounded">
      <h3 class="text-3xl text-green-900 font-bold mb-4">Casos</h3>

      <div class="text-2xl mb-4">
        <span class="font-bold">Nuevos:</span>
        {{ numberWithCommas(stats.NewConfirmed) }}
      </div>
      <div class="text-2xl mb-4">
        <span class="font-bold">Total:</span>
        {{ numberWithCommas(stats.TotalConfirmed) }}
      </div>
    </div>

    <!-- Box 2 -->
    <div class="shadow-md bg-green-100 p-10 text-center rounded">
      <h3 class="text-3xl text-green-900 font-bold mb-4">Defunciones</h3>

      <div class="text-2xl mb-4">
        <span class="font-bold">Nuevos:</span>
        {{ numberWithCommas(stats.NewDeaths) }}
      </div>
      <div class="text-2xl mb-4">
        <span class="font-bold">Total:</span>
        {{ numberWithCommas(stats.TotalDeaths) }}
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'DataBoxes',
  props: ['stats'],
  setup () {
    return {
      numberWithCommas (x) {
        return x.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    };
  }
};
</script>
