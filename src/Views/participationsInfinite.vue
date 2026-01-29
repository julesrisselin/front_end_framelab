<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const participationsInfos = ref([]);
const router = useRouter()
const id_filter = ref("");
const partInfos = ref([])

async function getParticipations() {
    const resp = await fetch("http://localhost:3000/api/participations")
    const data = await resp.json();
    participationsInfos.value = data;
}

async function getData() {

    const id_challenge = id_filter;
    console.log(id_challenge, id_filter)
    const params = new URLSearchParams();
    params.append("id_challenge", id_challenge);

    const respPart = await fetch(`http://localhost:3000/api/participations?id_challenge=${params}`);
    const dataPart = await respPart.json();
    console.log(dataPart)
    partInfos.value = dataPart;
}

async function goToCurrentChallenge() {
    router.push('/currentChallenge');
}

async function goToAccueil() {
    router.push('/');
}

async function goToCurrentParticipations() {
    router.push('/currentParticipations');
}

async function goToParticipations() {
    router.push('/participations');
}

async function goToLogin() {
    router.push('/login');
}

getData();
getParticipations();
</script>

<template>
    <header>
        <nav>
            <ul>
                <li>
                    <button @click=goToAccueil()> Accueil </button>
                </li>
                <li>
                    <button @click=goToCurrentChallenge()> Challenge </button>
                </li>
                <li>
                    <button @click=goToCurrentParticipations()> Participations de la semaine </button>
                </li>
                <li>
                    <button @click=goToParticipations()> Toutes les participations </button>
                </li>
                <li>
                    <button @click=goToLogin()> Connexion > </button>
                </li>
            </ul>
        </nav>
    </header id="accueil">

    <div id="" filter>
        <h2> Filtres </h2>
        <input type="number" v-model="id_filter" placeholder="Entrez l'id du challenge" required /> <button
            type="submit">Rechercher</button>



    </div>

    <div>
        <h2> Toutes les Participations ! </h2>
    </div>

    <li v-for="(picture) in participationsInfos.data">
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