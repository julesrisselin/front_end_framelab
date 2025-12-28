<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const pictureInfos = ref([]);
const router = useRouter()
const route = useRoute()


async function getPicture() {
    const resp = await fetch("http://localhost:3000/api/challenges/current")
    const data = await resp.json();
    pictureInfos.value = data;
    console.log(pictureInfos);
}

    async function goToCurrentChallenge(){
        router.push('/currentChallenge');
    }

    async function goToAccueil(){
        router.push('/');
    }

    async function goToCurrentParticipations(){
        router.push('/currentParticipations');
    }

    async function goToParticipations(){
        router.push('/participations');
    }

    async function goToLogin(){
        router.push('/login');
    }


getPicture();

</script>

<template>
    <header>
        <nav>
            <ul>
                <li>
                    <button @click= goToAccueil()> Accueil </button>
                </li>
                <li>
                    <button @click= goToCurrentChallenge()> Challenge </button>
                </li>
                <li>
                    <button @click= goToCurrentParticipations()> Participations de la semaine </button>
                </li>
                <li>
                    <button @click= goToParticipations()> Toutes les participations </button>
                </li>
                <li>
                    <button @click= goToLogin()> Connexion > </button>
                </li>
            </ul>
        </nav>
    </header id="accueil">

    <div id="img_accueil">
        <img src="@/assets/images/accueil/accueil.jpg"> </img>
    </div>

    <div id="first_scare">
        <div id="second_scare">
            {{ pictureInfos.data.data.picture }}
        </div>
        <h2> {{ pictureInfos.data.data.title_theme }} </h2>
        <h4> {{ pictureInfos.data.data.description_theme }} </h4>
        <button @click= goToCurrentChallenge()> Voir plus </button>
    </div>
</template>

<style scoped></style>