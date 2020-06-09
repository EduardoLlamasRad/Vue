<template>
    <div>
        <v-toolbar class="indigo" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Vuetify</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="success ma-1">
                Acceder
            </v-btn>
            <v-btn class="error ma-1">
                Salir
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer app v-model="drawer" temporary dark>
            <v-layout mt-4 column align-center>
                <v-flex>
                    <v-avatar>
                    <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="Usuario">
                    </v-avatar>
                </v-flex>
                <v-flex>
                    <p class="white--text mt-3 headline">Pedro Samudio</p>
                </v-flex>
            </v-layout>
            <v-layout column>
                <v-flex mx-3>
                    <v-btn class="ma-1" color="success" block :to="{name: 'Home'}">
                        Home
                    </v-btn>
                    <v-btn class="ma-1" color="success" block :to="{name: 'Tareas-CRUD'}">
                        Lista de tareas
                    </v-btn>
                </v-flex>
                
            </v-layout>
        </v-navigation-drawer>
    </div>
</template>
<script>

export default {
    name: 'Navbar',
    data: ()=> ({
        drawer: true
    }),

}
</script>