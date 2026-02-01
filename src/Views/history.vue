<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfos = ref([]);
const participation = ref([]);

async function getData() {
    const respAccount = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include"
    })
    const dataUser = await respAccount.json();
    userInfos.value = dataUser;
    const paramsPart = new URLSearchParams();
    paramsPart.append("user_id", userInfos.value.id);

    const respPart = await fetch(`http://localhost:3000/api/participations?user_id=${paramsPart}`)
    const dataPart = await respPart.json();
    participation.value = dataPart;
    
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

async function goToAccount() {
    router.push('/account');
}


getData();

</script>

<template>
    <header>
        <nav id="navbar">
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
                    <button @click=goToAccount() id="Account"> Mon compte > </button>
                </li>
            </ul>
        </nav>
    </header>

    <h1> Historique de vos participations </h1>

    <li v-for="(picture) in participation.data">
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