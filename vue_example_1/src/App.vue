<template>
  <div id="app" class="container">
    <Cabecera></Cabecera>
    <Lista></Lista>
    <BotonLimpiar></BotonLimpiar>
    
  </div>
</template>

<script>
import Cabecera from './components/Cabecera.vue'
import Lista from './components/Lista'
import BotonLimpiar from './components/BotonLimpiar'

export default {
  name: 'App',
  components: {
    Cabecera,
    Lista,
    BotonLimpiar
  }
}
</script>
