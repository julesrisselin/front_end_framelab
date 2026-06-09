<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const pictureInfos = ref([]);
const router = useRouter()
const authentification = ref(false);
const URL_SERVEUR = import.meta.env.VITE_SERVER_URL


async function getPicture() {
    const resp = await fetch(URL_SERVEUR + "/api/challenges/current")
    const data = await resp.json();
    pictureInfos.value = data.data;

    const respAccount = await fetch(URL_SERVEUR + "/api/users/me", {
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
    <div class="all">
        <div id="picture_box">
            <img :src="URL_SERVEUR + pictureInfos.picture" id="picture"></img>
        </div>

        <div class="scare2">
            <h1 id="title"> Challenge de la Semaine ! </h1>

            <div id="scare">

                <div id="infos_chall">
                    <v-card variant="tonal">
                        <v-card-title>
                            {{ pictureInfos.title_theme }}
                        </v-card-title>
                        <v-card-subtitle>
                            Du {{ (new Date(pictureInfos.date_start)).toLocaleDateString() }}
                            au {{ (new Date(pictureInfos.date_end)).toLocaleDateString() }}
                        </v-card-subtitle>
                        <v-card-text>
                            {{ pictureInfos.description_theme }}
                        </v-card-text>
                        <v-card-actions>
                            <router-link :to="`/currentParticipations`">
                                <v-btn variant="outlined" id="btn"> Les Photos > </v-btn>
                            </router-link>
                            <router-link :to="`/${pictureInfos.id}/subparticipation`">
                                <v-btn variant="outlined" id="btn"> Participer ! </v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </div>

            </div>
        </div>
    </div>

    <h2 id="title"> Bonne chance ! </h2>


</template>

<style scoped>
#picture {
    border-radius: 20px;
    max-height: 550px;
    max-width: 750px;
}

#picture_box {
    display: flex;
    justify-content: flex-start;
}

.all {
    display: flex;
    justify-content: center;
}

.scare2 {
    margin: auto;
}

#title {
    display: flex;
    justify-content: center;
    
}

#btn {
    margin: 10px;
    color: #6B9080;
    height: 45px;
    width: 120px;
    border-radius: 20px;
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