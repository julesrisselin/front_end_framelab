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
const emptymess = ref(false);
const URL_SERVEUR = import.meta.env.VITE_SERVER_URL;

async function getParticipations() {
    const resp = await fetch(URL_SERVEUR + "/api/participations")
    const data = await resp.json();
    participationsInfos.value = data.data;
}

async function account() {
    const respAccount = await fetch('${URL_SERVEUR}/api/users/me', {
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

    const respPart = await fetch(`${URL_SERVEUR}/api/participations?${params}`);
    const dataPart = await respPart.json();
    if (dataPart.length > 0) {
        checkChallenge.value = true;
    } else {
        emptymess.value = true;
    }
    partInfosByChallenge.value = dataPart.data;
}


async function getPartByUserID() {
    const params = new URLSearchParams();
    params.append("user_id", user_id.value);

    const respUser = await fetch(`${URL_SERVEUR}/api/participations?${params}`);
    const dataUser = await respUser.json();
    if (dataUser.length > 0) {
        checkUser.value = true;
    } else {
        emptymess.value = true;
    }
    partInfosByUser.value = dataUser.data;

}

async function showAll() {
    checkChallenge.value = false
    checkUser.value = false
    emptymess.value = false
}

account();
getParticipations();
</script>

<template>
    <h2> Filtres </h2>
    <div id="formSignIn">
        <v-card class="mb-2" minWidth="400" minHeight="300">
            <v-card-text>
                <v-text-field v-model="id_challenge" type="number" placeholder="Entrez l'id du challenge" required />
                <v-btn @click=getPartByChallenge()>Afficher</v-btn>
                <br>
                <v-text-field v-model="user_id" type="number" placeholder="Entrez l'id du user" required />
                <v-btn @click="getPartByUserID()">Afficher</v-btn>
                <br>
                <v-btn @click=showAll() class="position-absolute bottom-0 right-0 rounded-lg"> Tout Afficher
                </v-btn>
            </v-card-text>

        </v-card>
    </div>

    <div>
        <h2 class=""> Toutes les Participations ! </h2>
    </div>

    <v-container fluid>
        <v-row>
            <template v-if="checkChallenge" v-for="picture in partInfosByChallenge">
                <v-col cols="12" sm="6" md="4" lg="3">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card v-bind="props" class="gallery-card" :elevation="isHovering ? 12 : 3" rounded="xl">
                            <v-img :src="URL_SERVEUR + picture.picture_updated_url" height="250" cover>
                                <div class="overlay">
                                    <v-btn color="#6B9080" variant="flat" rounded="lg"
                                        @click="$router.push('/participation/' + picture.id)">
                                        Voir les détails
                                    </v-btn>
                                </div>
                            </v-img>
                            <v-card-text color="#6B9080" class="d-flex justify-space-between align-center">
                                <span>
                                    {{ picture.date_submission }}
                                </span>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </template>
            <template v-else-if="checkUser" v-for="(picture) in partInfosByUser">
                <v-col cols="12" sm="6" md="4" lg="3">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card v-bind="props" class="gallery-card" :elevation="isHovering ? 12 : 3" rounded="xl">
                            <v-img :src="URL_SERVEUR + picture.picture_updated_url" height="250" cover>
                                <div class="overlay">
                                    <v-btn color="#6B9080" variant="flat" rounded="lg"
                                        @click="$router.push('/participation/' + picture.id)">
                                        Voir les détails
                                    </v-btn>
                                </div>
                            </v-img>
                            <v-card-text color="#6B9080" class="d-flex justify-space-between align-center">
                                <span>
                                    {{ picture.date_submission }}
                                </span>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </template>
            <v-col cols="12" v-else-if="emptymess">
                <v-alert type="info" variant="tonal" rounded="xl">
                    Aucune participation trouvée.
                </v-alert>
            </v-col>
            <template v-else v-for="(picture) in participationsInfos">
                <v-col cols="12" sm="6" md="4" lg="3">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card v-bind="props" class="gallery-card" :elevation="isHovering ? 12 : 3" rounded="xl">
                            <v-img :src="URL_SERVEUR + picture.picture_updated_url" height="250" cover>
                                <div class="overlay">
                                    <v-btn color="#6B9080" variant="flat" rounded="lg"
                                        @click="$router.push('/participation/' + picture.id)">
                                        Voir les détails
                                    </v-btn>
                                </div>
                            </v-img>
                            <v-card-text color="#6B9080" class="d-flex justify-space-between align-center">
                                <span>
                                    {{ picture.date_submission }}
                                </span>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </template>

        </v-row>
    </v-container>
</template>

<style scoped>
.gallery-card {
    transition: all 0.3s ease;
    overflow: hidden;
}

.gallery-card:hover {
    transform: translateY(-8px);
}

.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0;
    transition: opacity 0.3s ease;
}

.gallery-card:hover .overlay {
    opacity: 1;
}
</style>