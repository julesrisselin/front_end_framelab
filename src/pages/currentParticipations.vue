<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const challengeInfos = ref({});
const partInfos = ref([]);
const router = useRouter();
const authentification = ref(false);
const URL_SERVEUR = import.meta.env.VITE_SERVER_URL

async function getData() {
    const respChallenge = await fetch(`${URL_SERVEUR}/api/challenges/current`);
    const dataChallenge = await respChallenge.json();
    challengeInfos.value = dataChallenge.data;

    const id_challenge = challengeInfos.value.id;

    const params = new URLSearchParams();
    params.append("id_challenge", id_challenge);

    const respPart = await fetch(`${URL_SERVEUR}/api/participations?${params}`);
    const dataPart = await respPart.json();
    partInfos.value = dataPart.data;

    const respAccount = await fetch(`${URL_SERVEUR}/api/users/me`, {
        credentials: "include"
    })

    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }
}


getData();

</script>

<template>

    <div id="challenge">
        <div id="img_chall">
            <img :src="URL_SERVEUR + challengeInfos.picture" id="picture"></img>
        </div>


        <div id="scare">
            <div id="infos_chall">
                <h2> Challenge de la Semaine ! </h2>
                <v-card variant="tonal">
                    <v-card-title>
                        {{ challengeInfos.title_theme }}
                    </v-card-title>
                    <v-card-subtitle>
                        Du {{ (new Date(challengeInfos.date_start)).toLocaleDateString() }}
                        au {{ (new Date(challengeInfos.date_end)).toLocaleDateString() }}
                    </v-card-subtitle>
                    <v-card-text>
                        {{ challengeInfos.description_theme }}
                    </v-card-text>
                </v-card>
            </div>
        </div>

    </div>

    <h3 id="title"> PARTICIPATIONS ! </h3>

    <v-container>
        <v-row gap="100">
            <v-col v-for="(picture) in partInfos" max-width="600" max-height="600" id="cards">
                <v-sheet class="pa-2">
                    <v-card maxWidth="400" maxHeight="300">
                        <v-img color="surface-variant" height="200" :src="URL_SERVEUR + picture.picture_updated_url"
                            cover />
                        <v-card-actions>
                            <v-btn @click="$router.push('/participation/' + picture.id)"> Voir les détails </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>





</template>

<style scoped>
#picture {
    border-radius: 20px;
    max-height: 250px;
    max-width: 450px;
    margin-right: 10%;
}

#title {
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-style: bold;

}

#challenge {
    display: flex;
    justify-content: space-around;
}

#box_card {
    display: flex;
    justify-content: space-between;
}
</style>