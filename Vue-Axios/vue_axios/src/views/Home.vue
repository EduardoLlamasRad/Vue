<template>
  <div class="home">
    <v-layout :wrap="true">
      <v-flex xs12>
        <v-card>
          <v-date-picker v-model="fecha" 
          color="green lighten-1" 
          header-color="primary"
          full-width
          locale="es-mx"
          :min="minimo"
          :max="maximo"
          @change="getDollar(fecha)"
          ></v-date-picker>
        </v-card>
        <v-card color="error" dark>
          <v-card-text class="display-1 text-sm-center">
            MXN. {{valorUSD}}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import {mapMutations} from "vuex"

export default {
  name: 'Home',
  data() {
    return {
      fecha: new Date().toISOString().substring(0,10),
      minimo: '1984',
      maximo: new Date().toISOString().substring(0,10),
      valorUSD: null
    }
  },
  methods: {
    ...mapMutations(['showLoading','hideLoading']),
    async getDollar(fechaClick){
      //formato de fecha yyyy-mm-dd
      try {
        this.showLoading({titulo:'Obteniendo información',color:'secondary'});
        let datos = await axios.get(`https://api.exchangeratesapi.io/${fechaClick}?base=USD&symbols=MXN`);
        console.log(datos.data.rates.MXN);
        this.valorUSD = await datos.data.rates.MXN;
        
      } catch (error) {
        console.log(error);
      }
      finally{
        this.hideLoading();

      }
    }
  },


}
</script>
