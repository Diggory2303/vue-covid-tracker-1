<template>
  <main v-if="!loading">
    <DataTitle :dataDate="dataDate" :text="title" :code="code"  />

    <DataBoxes :stats="status" />

    <CountrySelect :countries="countries" @get-country="getCountryData" />

    <Graph :stats="status" />

    <button
      v-if="status.Country"
      class="bg-green-700 text-white rounded p-3 mt-10 focus:outline-none hover:bg-green-600"
      @click="clearCountryData"
    >
      Cambiar país
    </button>
      <div>
     <button class="bg-green-600 mt-8 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline p-8" @click="$router.push('/')">Regresar al menú</button>
      </div>
  </main>

  <main v-else class="flex flex-col align-center justify-center text-center">
    <div class="text-gray-500 text-3xl mt-10 mb-6">
      Buscando datos...
    </div>
    <img :src="require('../assets/hourglass.gif')" alt="" class="w-24 m-auto" />
    
  </main>
</template>

<script>
import CountrySelect from '@/components/CountrySelect';
import DataBoxes from '@/components/DataBoxes';

import DataTitle from '../components/DataTitle';

import { ref } from 'vue';

export default {
  name: 'Home',
  components: {
    DataTitle,
    DataBoxes,
    CountrySelect,
  },
  
    
  setup () {
    const loading = ref(true);
    const title = ref('Global');
    const code = ref('GLB');
    const dataDate = ref('');
    const status = ref({});
    const countries = ref([]);

    const fetchCovidData = async () => {
      const res = await fetch('https://api.covid19api.com/summary');
      return await res.json();
    };

    const getCountryData = (country) => {
      status.value = country;
      title.value = country.Country;
      code.value = country.CountryCode;
    };

    const clearCountryData = async () => {
      loading.value = true;
      const data = await fetchCovidData();
      title.value = 'Global';
      status.value = data.Global;
      loading.value = false;
    };

    const baseSetup = async () => {
      const data = await fetchCovidData();

      dataDate.value = data.Date;
      status.value = data.Global;
      countries.value = data.Countries;
      loading.value = false;
    };

    baseSetup();

    return {
      loading,
      title,
      code,
      dataDate,
      status,
      countries,
      getCountryData,
      clearCountryData
    };
  }
};

</script>
