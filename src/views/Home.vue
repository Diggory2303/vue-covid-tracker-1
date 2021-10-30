<template>

<h2 class="text-2xl mb-4">Bienvenido al portal #1 de Covid</h2>
<h4>Por favor responder con Si o No tal cual</h4>
  <div class="grid md:grid-cols-2 gap-4">
    
    <div class="flex justify-left items-center mt">
    <div class="w-full max-w-xl">
     
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="identity-input mb-4">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Has tenido, o sientes que podrias haber contraido COVID?</label
          >
          <input
            id="identity"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            aria-describedby="emailHelp"
             v-model="newCovid.covid"
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="identity-input mb-4">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Cual es tu profesion?</label
          >
          <input
            id="identity"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
             v-model="newCovid.profesion"
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="identity-input mb-4">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Te encuentras vacunado contra el Covid-19?</label
          >
          <input
            id="identity"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="newCovid.vacunado"
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="agregarCovid"
          >
            Mandar formulario
          </button>
        </div>
      </form>
      <div>
      <button class="bg-green-600 pl-15 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="$router.push('covid')">Ir a la pagina de Covid-19</button>
      
      </div>
      
      <p>Usuarios con Covid-19 :{{covid}}</p>
      <p>Usuarios sin Covid-19 :{{noCovid}}</p>
      <p>Usuarios vacunados :{{vacunado}}</p>
      <p>Usuarios no vacunados :{{noVacunado}}</p>
    </div>
  </div>
    <img src="../assets/covid.png" class="mb-4"/>
  </div>
  
</template>

<script>


export default {
  data:()=>({
        covids:[],
        covid:0,
        noCovid:0,
        vacunado:0,
        noVacunado:0,
        newCovid:{
          covid: "",
          profesion: "",
          vacunado:""
        }
    }),
  methods: {
    async agregarCovid(){
              await this.axios.post('https://covid-tracker-semtec.herokuapp.com/cuestionario',this.newCovid).then((response)=>{
                  console.log(response);
                  console.log(this.newCovid);
                  this.cargarTodos();
              })
              this.newCovid.covid=""
              this.newCovid.profesion=""
              this.newCovid.vacunado=""
          },
          cargarTodos(){
              this.axios('https://covid-tracker-semtec.herokuapp.com/cuestionario/list').then((response)=>{
                console.log(response);
                this.covids=response.data
              })
          },
          cargarEstadisticas(){
              this.axios('https://covid-tracker-semtec.herokuapp.com/cuestionario/list').then((response)=>{
                let tienenCovid = 0;
                let noCovid = 0;
                let vacunados =0;
                let noVacunado = 0 ;

                // Covid
                for (let i = 0; i < response.data.length; i++) {
                  if(response.data[i].covid == 'Si'){
                    tienenCovid += 1;
                  }else{
                    noCovid += 1;
                  }
                }

                //Vacunados
                for (let i = 0; i < response.data.length; i++) {
                  if(response.data[i].vacunados == 'Si'){
                    vacunados += 1;
                  }else{
                    noVacunado +=1;
                  }
                }
                 this.covid = tienenCovid;
                this.noCovid = noCovid;
                this.vacunado = vacunados;
                this.noVacunado = noVacunado;

              })

            
               
              
          }
  },
  mounted(){
          this.cargarTodos();
          this.cargarEstadisticas();
      },
 
};
</script>
