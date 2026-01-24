<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const pictureInfos = ref([]);
const router = useRouter()


async function getPicture() {
    const resp = await fetch("http://localhost:3000/api/challenges/current")
    const data = await resp.json();
    pictureInfos.value = data;
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
        <nav id="navbar">
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
    </header>

    <div id="img_accueil">
        <img src="@/assets/images/accueil/accueil.jpg"> </img>
    </div>

    <div id="first_scare">
        <div id="second_scare">
            <img :src= "'http://localhost:3000/' +  pictureInfos.data.picture" ></img>
        </div>
        <h2> {{ pictureInfos.data.title_theme }} </h2>
        <h4> {{ pictureInfos.data.description_theme }} </h4>
        <button @click= goToCurrentChallenge()> Voir plus </button>
    </div>
</template>

<style scoped>

#navbar{
    background-color: #6B9080;
    border-radius: 45px;
    max-width: 100%;
    min-width: 100%;
    max-height: 120px;
    min-height: 10px;

    
    
}

ul {
  align-items: center;
  display: flex;
  list-style: none;
  padding: 40px;
  margin: 40px;
  justify-content: space-between;
}



</style>