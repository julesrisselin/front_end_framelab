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
    pictureInfos.value = data;


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
console.log(import.meta.env.VITE_SERVER_URL);

async function goToCurrentChallenge() {
    router.push('/currentChallenge');
}

getPicture();

</script>

<template>

    <div id="img_accueil">
        <img id="img_challenge" :src="serverUrl + pictureInfos.data.picture"></img>
        <img id="img" src="@/assets/images/accueil/accueil.jpg"> </img>
    </div>
    <div id="infos">
        <div v-if=pictureInfos.data.picture id="first_scare">
            <div>
                <h2> {{ pictureInfos.data.title_theme }} </h2>
                <h4> {{ pictureInfos.data.description_theme }} </h4>
            </div>
            <button @click=goToCurrentChallenge() id="btn_Chall"> > </button>
        </div>

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

#img_challenge {
    margin-left: 2%;
    border-radius: 20px;
    max-height: 550px;
    max-width: 750px;
}

#first_scare {
    margin-left: 2%;
    display: flex;
    justify-content: flex-start;
    margin-right: 5%;
}

#btn_Chall {
    font-size: 30px;
    border-radius: 40px;
    height: 50px;
    width: 70px;
    background-color: #CCE3DE;
    margin-left: 3%;
    margin-top: 3%;
}
</style>