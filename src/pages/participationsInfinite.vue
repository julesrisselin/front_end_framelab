<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const participationsInfos = ref([]);
const router = useRouter()
const id_challenge = ref("");
const user_id = ref("");
const partInfosByChallenge = ref([]);
const partInfosByUser = ref([]);
const authentification = ref(false);
const checkChallenge = ref(false);
const checkUser = ref(false);
const emptymess = ref(false);

async function getParticipations() {
    const resp = await fetch(import.meta.env.VITE_SERVER_URL + "/api/participations")
    const data = await resp.json();
    participationsInfos.value = data.data;
}

async function account() {
    const respAccount = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users/me", {
        credentials: "include"
    })
    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }
}

async function getPartByChallenge() {
    const params = new URLSearchParams();
    params.append("id_challenge", id_challenge.value);

    const respPart = await fetch(`http://localhost:3000/api/participations?${params}`);
    const dataPart = await respPart.json();
    if (dataPart.length > 0) {
        checkChallenge.value = true;
    } else {
        emptymess.value = true;
    }
    partInfosByChallenge.value = dataPart.data;
}


async function getPartByUserID() {
    const params = new URLSearchParams();
    params.append("user_id", user_id.value);

    const respUser = await fetch(`http://localhost:3000/api/participations?${params}`);
    const dataUser = await respUser.json();
    if (dataUser.length > 0) {
        checkUser.value = true;
    } else {
        emptymess.value = true;
    }
    partInfosByUser.value = dataUser.data;
    
}

async function showAll() {
    checkChallenge.value = false
    checkUser.value = false
    emptymess.value = false
}

account();
getParticipations();
</script>

<template>
        <div id="formSignIn">
            <h2> Filtres </h2>
            <v-card class="mb-2" maxWidth="400" maxHeight="300">
                <v-card-text>
                    <v-text-field v-model="id_challenge" type="number" placeholder="Entrez l'id du challenge" required/>
                    <v-btn @click=getPartByChallenge()>Afficher</v-btn>

                    <br>

                    <v-text-field v-model="user_id" type="number" placeholder="Entrez l'id du user" required/>
                    <v-btn @click="getPartByUserID()">Afficher</v-btn>
                    <br>
                    <v-btn @click=showAll() class="position-absolute bottom-0 right-0 rounded-lg"> Tout Afficher </v-btn>
                </v-card-text>
            
            </v-card>
        </div>





    <div>
        <h2 class=""> Toutes les Participations ! </h2>
    </div>

    <li v-if="checkChallenge" v-for="(picture) in partInfosByChallenge">
        <img :src="'http://localhost:3000/' + picture.picture_updated_url" id="picture"></img>
        {{ picture.date_submission }}
    </li>
    <li v-else-if="checkUser" v-for="(picture) in partInfosByUser">
        <img :src="'http://localhost:3000/' + picture.picture_updated_url" id="picture"></img>
        {{ picture.date_submission }}
    </li>
    <li v-else-if="emptymess">
        <h3> L'id donnée n'a aucune participation associée </h3>
    </li>
    <li v-else v-for="(picture) in participationsInfos">
        <img :src="'http://localhost:3000/' + picture.picture_updated_url" id="picture"></img>
        {{ picture.date_submission }}
    </li>


</template>

<style scoped>
#picture {
    max-height: 150px;
    max-width: 150px;
}
</style>