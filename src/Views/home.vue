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


getPicture();

</script>

<template>
    <header>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/"> Accueil </RouterLink>
                </li>
                <li>
                    <RouterLink to="/currentChallenge"> Challenge </RouterLink>
                </li>
                <li>
                    <RouterLink to="/currentParticipations"> Participations de la semaine </RouterLink>
                </li>
                <li>
                    <RouterLink to="/participations"> Toutes les participations </RouterLink>
                </li>
                <li>
                    <RouterLink to="/login"> Connexion </RouterLink>
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