<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const challengeInfos = ref([]);
const partInfos = ref([]);
const router = useRouter();

async function getData() {
    const respChallenge = await fetch("http://localhost:3000/api/challenges/current");
    const dataChallenge = await respChallenge.json();
    challengeInfos.value = dataChallenge;

    const id_challenge = challengeInfos.value.data.id;

    const params = new URLSearchParams();
    params.append("id_challenge", id_challenge);

    const respPart = await fetch(`http://localhost:3000/api/participations?id_challenge=${params}`);
    const dataPart = await respPart.json();
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

async function goToAllParticipations() {
    router.push('/participations');
}

async function goToLogin() {
    router.push('/login');
}

getData();

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
                    <button @click=goToAllParticipations()> Toutes les participations </button>
                </li>
                <li>
                    <button @click=goToLogin()> Connexion > </button>
                </li>
            </ul>
        </nav>
    </header id="accueil">

    <div>
        <img :src="'http://localhost:3000/' + challengeInfos.data.picture" id="picture"></img>
    </div>

    <div>
        <h1> Challenge de la Semaine ! </h1>
    </div>

    <div>
        <h3> {{ challengeInfos.data.title_theme }} </h3>
    </div>

    <div id="scare">

        <h4> Thème </h4>
        <p> {{ challengeInfos.data.title_theme }} </p>
        <h4> Description </h4>
        <p> {{ challengeInfos.data.description_theme }} </p>
        <h4> Date de début </h4>
        <p> {{ challengeInfos.data.date_start }} </p>
        <h4> Date de fin </h4>
        <p> {{ challengeInfos.data.date_end }} </p>

    </div>

    <h3> Participations ! </h3>

    <li v-for="(picture) in partInfos.data">
        <img :src="'http://localhost:3000/' + picture.picture_updated_url" id="picture"></img>
        {{ picture.date_submission }}
        <button @click="$router.push('/participation/'+ picture.id)"> Voir les détails </button>
    </li>

</template>

<style scoped>
#picture {
    max-height: 150px;
    max-width: 150px;
}
</style>