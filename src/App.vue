<template id="template">
  <v-app id="v-app">

    <v-app-bar id="v-bar">

      <v-btn to="/" id="btn-nav">ACCUEIL</v-btn>
      <v-btn to="/currentChallenge" id="btn-nav">CHALLENGE</v-btn>
      <v-btn to="/currentParticipations" id="btn-nav">PARTICIPATIONS DE LA SEMAINE</v-btn>
      <v-btn to="/participationsInfinite" id="btn-nav">TOUTES LES PARTICIPATIONS</v-btn>
      <v-spacer/>
      <v-btn to="/login" v-if="!authentification" class="mr-4" id="btn-nav-connexion"> CONNEXION</v-btn>
      <template v-else>
        <v-btn to="/account" id="btn-nav-connexion"> MON COMPTE</v-btn>
        <v-btn to="/documentation" id="btn-nav-connexion"> AIDE </v-btn>
        <v-btn @click=LogOut() class="mr-3" id="btn-nav-connexion"> DÉCONNEXION </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vuetify/lib/composables/router.mjs';

const authentification = ref(false);
const router = useRouter()

async function account() {
  const respAccount = await fetch("http://localhost:3000/api/users/me", {
    credentials: "include"
  })
  if (respAccount.status === 200) {
    authentification.value = true;
  } else {
    authentification.value = false;
  }
}

async function LogOut() {
  const resp = await fetch("http://localhost:3000/api/auth/logout", {
    credentials: "include"
  })
  const data = await resp.json();
  authentification.value = false;
  router.push('/')
}

router.beforeEach(account)

//account();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comme:wght@100..900&display=swap');




#v-bar {
  background-color: #6B9080;
  border-radius: 20px;
  margin-left: 2%;
  margin-top: 1%;
  max-width: 95%;
  min-height: 10%;
  max-height: 30%;
  display: flex;
  justify-content: center;
  padding-left: 25px;
}

#v-app {
  font-family: 'Comme', serif;
  background-color: white;
  color: #6B9080;
  margin-top: 5%;
  margin-left: 2%;
}

#btn-nav {
  border-radius: 20px;
  background-color: white;
  color: #6B9080;
  font-weight: 400;
  font-size: small;
  margin-left: 5px;
  margin-right: 5px;
}

#btn-nav-connexion {
  border-radius: 20px;
  background-color: white;
  color: #6B9080;
  font-weight: 400;
  font-size: small;
  margin-left: 2%;
  display: flex;
  justify-content: flex-end;
}
</style>
