<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const pictureInfos = ref([]);
const router = useRouter()
const authentification = ref(false);


async function getPicture() {
    const resp = await fetch(import.meta.env.VITE_SERVER_URL + "/api/challenges/current")
    const data = await resp.json();
    pictureInfos.value = data.data;

    const respAccount = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users/me", {
        credentials: "include"
    })

    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }
}

getPicture();

</script>

<template>

    <div id="picture_box">
        <img :src="'http://localhost:3000/' + pictureInfos.picture" id="picture"></img>
    </div>


    <h1 id="title"> Challenge de la Semaine ! </h1>
    <h3 id="title"> {{ pictureInfos.title_theme }} </h3>


    <div id="scare">

        <div id="infos_chall">
            <ul>
                Thème : {{ pictureInfos.title_theme }}
            </ul>
            <ul>
                Description {{ pictureInfos.description_theme }}
            </ul>
            <ul>
                Date de début : {{ pictureInfos.date_start }}
            </ul>
            <ul>
                Date de fin : {{ pictureInfos.date_end }}
            </ul>
        </div>



        <div id="btn_participations">
            <router-link :to="`/${pictureInfos.id}/subparticipation`">
                <button id="btn"> Participer ! > </button>
            </router-link>
            <br>
            <router-link :to="`/currentParticipations`">
                <button id="btn"> Les Photos > </button>
            </router-link>
        </div>

    </div>

    <h2 id="title"> Bonne chance ! </h2>


</template>

<style scoped>
#picture {
    border-radius: 20px;
    max-height: 350px;
    max-width: 550px;
    margin-right: 10%;
}

#picture_box {
    display: flex;
    justify-content: center;
}

#title {
    display: flex;
    justify-content: center;
    margin-right: 10%;

}

#btn {
    border-radius: 40px;
    background-color: #CCE3DE;
    color: #6B9080;
    width: 10rem;
    height: 3rem;
    margin: 3px;
}

#btn_participations {
    margin-top: 30px;
    margin-right: 50px;
}

#scare {
    display: flex;
    justify-content: space-around;
}

#infos_chall {
    font-weight: bold;
    font-size: larger;
}

</style>