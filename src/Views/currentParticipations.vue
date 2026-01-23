<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const pictureInfos = ref([]);
const participationsInfos = ref([]);
const router = useRouter()



async function getPicture() {
    const resp = await fetch("http://localhost:3000/api/challenges/current")
    const data = await resp.json();
    pictureInfos.value = data;
}

async function getParticipations() {
    const resp = await fetch("http://localhost:3000/api/participations")
    const data = await resp.json();
    participationsInfos.value = data;
    console.log(particpationsInfos);
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

getPicture();
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

    <div id="picture">
        <img :src="'http://localhost:3000/' + pictureInfos.data.picture"></img>
    </div>

    <div>
        <h1> Challenge de la Semaine ! </h1>
    </div>

    <div>
        <h3> {{ pictureInfos.data.title_theme }} </h3>
    </div>

    <div id="scare">

        <h4> Thème </h4>
        <p> {{ pictureInfos.data.title_theme }} </p>
        <h4> Description </h4>
        <p> {{ pictureInfos.data.description_theme }} </p>
        <h4> Date de début </h4>
        <p> {{ pictureInfos.data.date_start }} </p>
        <h4> Date de fin </h4>
        <p> {{ pictureInfos.data.date_end }} </p>

    </div>

    <table>
        <thead>
            <tr>
                <td> Les Photos ! </td>
            </tr>
            <tr>
                <td> v </td>
            </tr>
            <tr>
                <td> <img :src= "'http://localhost:3000/' +  participationsInfos.data[1].picture_updated_url" ></img></td>
            </tr>
        </thead>
    </table>

</template>

<style scoped></style>