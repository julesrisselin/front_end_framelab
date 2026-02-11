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

async function getParticipations() {
    const resp = await fetch("http://localhost:3000/api/participations")
    const data = await resp.json();
    participationsInfos.value = data;
}

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

async function getPartByChallenge() {
    const params = new URLSearchParams();
    params.append("id_challenge", id_challenge.value);

    const respPart = await fetch(`http://localhost:3000/api/participations?id_challenge=${params}`);
    const dataPart = await respPart.json();
    if (dataPart.data.length > 0) {
        checkChallenge.value = true;
    }
    partInfosByChallenge.value = dataPart;
}


async function getPartByUserID() {

    const params = new URLSearchParams();
    params.append("user_id", user_id.value);

    const respUser = await fetch(`http://localhost:3000/api/participations?user_id=${params}`);
    const dataUser = await respUser.json();
    if (dataUser.data.length > 0) {
        checkUser.value = true;
    }
    partInfosByUser.value = dataUser;
}

async function showAll() {
    checkChallenge.value = false
    checkUser.value = false
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

async function goToAccount() {
    router.push('/account');
}

account();
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
                <li v-if="!authentification">
                    <button @click=goToLogin() id="Account"> Connexion </button>
                </li>
                <li v-else>
                    <button @click=goToAccount() id="Account"> Mon compte </button>
                </li>
            </ul>
        </nav>
    </header id="accueil">

    <div id="" filter>
        <h2> Filtres </h2>
        <input type="number" v-model="id_challenge" placeholder="Entrez l'id du challenge" required />
        <button @click=getPartByChallenge() id=""> Afficher </button>

        <br>

        <input type="number" v-model="user_id" placeholder="Entrez l'id du user" required />
        <button @click=getPartByUserID() id=""> Afficher </button>
        <br>
        <button @click=showAll() id=""> Tout Afficher </button>



    </div>

    <div>
        <h2 class=""> Toutes les Participations ! </h2>
    </div>

    <li v-if="checkChallenge" v-for="(picture) in partInfosByChallenge.data">
        <img :src="'http://localhost:3000/' + picture.picture_updated_url" id="picture"></img>
        {{ picture.date_submission }}
    </li>
    <li v-else-if ="checkUser" v-for="(picture) in partInfosByUser.data">
        <img :src="'http://localhost:3000/' + picture.picture_updated_url" id="picture"></img>
        {{ picture.date_submission }}
    </li>

    <li v-else v-for="(picture) in participationsInfos.data">
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