<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const pictureInfos = ref([]);
const router = useRouter()
const authentification = ref(false);
const check_image_accueil = ref(false);
const serverUrl = ref(import.meta.env.VITE_SERVER_URL);

async function getPicture() {
    const resp = await fetch(import.meta.env.VITE_SERVER_URL + "/api/challenges/current")
    const data = await resp.json();

    pictureInfos.value = data.data;

    if (pictureInfos.value.success == false) {
        check_image_accueil.value = false;
    } else {
        check_image_accueil.value = true;
    }


    const respAccount = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users/me", {
        credentials: "include"
    })

    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }
}

async function LogOut() {
    const resp = await fetch(import.meta.env.VITE_SERVER_URL + "/api/auth/logout", {
        credentials: "include"
    })
    const data = await resp.json();
}


async function goToCurrentChallenge() {
    router.push('/currentChallenge');
}

getPicture();

</script>

<template>

    <!-- <div id="img_accueil">
        <img id="img_challenge" :src="serverUrl + pictureInfos.picture"></img>
        <img id="img" src="@/assets/images/accueil/accueil.jpg"> </img>
    </div>
    <div id="infos">
        <div v-if=pictureInfos.picture id="first_scare">
            <div>
                <h2> {{ pictureInfos.title_theme }} </h2>
                <h4> {{ pictureInfos.description_theme }} </h4>
            </div>
            <router-link :to="`/currentChallenge`">
                <v-btn variant="outlined" id="btn"> Voir le Challenge </v-btn>
            </router-link>
        </div>
    </div> -->

    <div id="img_accueil">
        <v-card id="infos" title="BIENVENUE !" min-width="800" max-width="1000" max-height="800">
            <img id="img_challenge" :src="serverUrl + pictureInfos.picture"></img>
            <v-subtitle>
                <h2 id="infos"> {{ pictureInfos.title_theme }} </h2>
                <h4 id="infos"> {{ pictureInfos.description_theme }} </h4>
            </v-subtitle>
            <v-card-actions>
                <router-link :to="`/currentChallenge`">
                    <v-btn variant="outlined" id="btn"> Voir le Challenge </v-btn>
                </router-link>
            </v-card-actions>
        </v-card>
        <img id="img" src="@/assets/images/accueil/accueil.jpg"> </img>
    </div>
</template>

<style scoped>
#img_accueil {
    display: flex;
    justify-content: space-between;
    margin-right: 5%;
}

#img {
    margin-top: -4%;
}

#infos {
    color: #6B9080;
    margin-left: 10px;
}

#img_challenge {
    margin-left: 2%;
    border-radius: 20px;
    max-height: 550px;
    max-width: 750px;
}

#first_scare {
    display: flex;
    justify-content: flex-start;
}

#btn {
    color: #6B9080;
    height: 55px;
    width: 140px;
    border-radius: 20px;
    font-weight: bold;
}
</style>