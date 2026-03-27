<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const challengeInfos = ref({});
const partInfos = ref([]);
const router = useRouter();
const authentification = ref(false);

async function getData() {
    const respChallenge = await fetch(import.meta.env.VITE_SERVER_URL + "/api/challenges/current");
    const dataChallenge = await respChallenge.json();
    challengeInfos.value = dataChallenge;

    const id_challenge = challengeInfos.value.data.id;

    const params = new URLSearchParams();
    params.append("id_challenge", id_challenge);

    const respPart = await fetch(`http://localhost:3000/api/participations?id_challenge=${params}`);
    const dataPart = await respPart.json();
    partInfos.value = dataPart;

    const respAccount = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users/me", {
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
            <img :src="'http://localhost:3000/' + challengeInfos.data.picture" id="picture"></img>
        </div>


        <div id="scare">
            <div id="infos_chall">
                <h2> Challenge de la Semaine ! </h2>
                <ul>
                    Thème : {{ challengeInfos.data.title_theme }}
                </ul>
                <ul>
                    Description {{ challengeInfos.data.description_theme }}
                </ul>
                <ul>
                    Date de début : {{ challengeInfos.data.date_start }}
                </ul>
                <ul>
                    Date de fin : {{ challengeInfos.data.date_end }}
                </ul>
            </div>

        </div>

    </div>

    <h3 id="title"> PARTICIPATIONS ! </h3>

    <v-container>
        <v-row gap="100">
            <v-col v-for="(picture) in partInfos.data" max-width="600" max-height="600" id="cards">
                <v-sheet class="pa-2">
                    <v-card>
                        <v-img color="surface-variant" height="200"
                            :src="'http://localhost:3000/' + picture.picture_updated_url" cover />
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