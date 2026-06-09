<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute();

const id_participation = route.params.id;
const participation = ref([]);
const user = ref([]);
const comments = ref([]);
const votes = ref([]);
const authentification = ref(false);
const verifAdmin = ref(false);
const userInfos = ref([]);
const commentaires = ref("");

const note_creativity = ref("");
const note_on_theme = ref("");
const note_technique = ref("");
const nb_total_com = ref();
const userData = ref("");
const repSubVotes = ref();
const respSubCom = ref();
const URL_SERVEUR = import.meta.env.VITE_SERVER_URL;

const paramsPart = new URLSearchParams();
paramsPart.append("id_participation", id_participation);



async function getData() {
    const respPart = await fetch(`${URL_SERVEUR}/api/participations?${paramsPart}`)
    const dataPart = await respPart.json();
    participation.value = dataPart.data;

    const paramsUser = new URLSearchParams();
    paramsUser.append("user_id", participation.value.user_id);

    const respUser = await fetch(`${URL_SERVEUR}/api/users?${paramsUser}`)
    const dataUser = await respUser.json();
    user.value = dataUser.data;

    const paramsComVotes = new URLSearchParams();
    paramsComVotes.append("id_participation", participation.value.id);

    const respComments = await fetch(`${URL_SERVEUR}/api/comments?${paramsComVotes}`);
    const dataComments = await respComments.json();
    comments.value = dataComments.data;
    nb_total_com.value = dataComments.data.length;

    const respVotes = await fetch(`${URL_SERVEUR}/api/votes?${paramsComVotes}`)
    const dataVotes = await respVotes.json();
    votes.value = dataVotes.data;


    const respVotesTotal = await fetch(`${URL_SERVEUR}/api/votes`)
    const dataVotesTotal = await respVotesTotal.json();


    const respAccount = await fetch(`${URL_SERVEUR}/api/users/me`, {
        credentials: "include"
    })

    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }

    userData.value = await respAccount.json();

    if (userInfos.value.is_admin == 1) {
        verifAdmin.value = true
    }
}

async function sendComments() {
    const response = await fetch(`${URL_SERVEUR}/api/comments`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_participations: id_participation,
            user_id: userData.value.id,
            content: commentaires.value
        }),
    });
    const data = await response.json();
    if (data.success == false)
        respSubCom.value = data.message
}

async function sendVotes() {
    if (userData.value.id == participation.value.user_id) {
        return repSubVotes.value = "Vous ne pouvez pas voter pour votre propre participation";
    } else {
        const response = await fetch(`${URL_SERVEUR}/api/votes`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_participations: id_participation,
                user_id: userData.value.id,
                note_creativity: note_creativity.value,
                note_on_theme: note_on_theme.value,
                note_technique: note_technique.value,
            }),
        });
        const votesData = await response.json();
        if (votesData.success) {
            repSubVotes.value = "Votre votes a bien été pris en compte";
        } else {
            repSubVotes.value = "Vous avez déjà voter";
        }
    }
}

async function suppCom(id) {
    const response = await fetch(`${URL_SERVEUR}/comments`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            is_visible: 0,
        }),
    });
}

getData();
</script>

<template>

    <div>
        <img :src="URL_SERVEUR + participation.picture_updated_url" id="picture"></img>
    </div>
    <div>
        <h3> Fait par {{ user.name }} {{ user.firstname }} le {{ participation.date_submission }}</h3>
    </div>
    <div>
        <h3> Pour le challenge N°{{ participation.id_challenge }} </h3>
    </div>

    <div id="input_box">
        <div id="input_votes">
            <v-card class="mx-auto" minWidth="600" max-width="600">
                <v-card-title class="font-weight-medium" id="text"> NOTER LA PARTICIPATION </v-card-title>
                <v-card-text>
                    <v-text-field v-model="note_creativity" type=" number" max="5" class="vote"
                        placeholder="note de créativité" name="note_creativity" />
                    <v-text-field v-model="note_technique" type=" number" max="5" class="vote"
                        placeholder="note de technique" name="note_technique" />
                    <v-text-field v-model="note_on_theme" type=" number" max="5" class="vote"
                        placeholder="note respect du theme" name="note_on_theme" />

                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="sendVotes()" id="text">Envoyer</v-btn>
                </v-card-actions>
            </v-card>
            <v-subtitle> {{ repSubVotes }} </v-subtitle>
        </div>

        <div id="input_com">
            <v-card class="mx-auto" minWidth="600" max-width="600">
                <v-card-title class="font-weight-medium" id="text"> COMMENTER LA PARTICIPATION </v-card-title>
                <v-card-text>
                    <v-text-field v-model="commentaires" type="text" class="comments"
                        placeholder="Entrez un commentaires" name="comments" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="sendComments()" id="text">Envoyer</v-btn>
                </v-card-actions>
            </v-card>
            <v-subtitle> {{ respSubCom }} </v-subtitle>
        </div>
    </div>
    <br>

    <h4> Votes :</h4>
    <v-container>
        <v-row>
            <v-col v-for="(votes) in votes">
                <v-card max-width="275px">
                    <v-list>
                        <v-card-title id="text">
                            Compte N° {{ votes.user_id }}
                        </v-card-title>
                        <v-card-subtitle id="text">
                            Note de créativité : {{ votes.note_creativity }}
                            <br>
                            Note respect du thème : {{ votes.note_on_theme }}
                            <br>
                            Note de technique : {{ votes.note_technique }}
                        </v-card-subtitle>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>


    <h3> Commentaire :</h3>
    <h4> Nombre total de commentaires : {{ nb_total_com }} </h4>
    <v-container>
        <v-row>
            <v-col v-for="(comments) in comments" id="box-com">
                <v-card class="mb-2" maxWidth="275px" rounded=8px>
                    <v-card-title v-if="comments.is_visible" id="text"> Compte N° {{ comments.user_id }} </v-card-title>
                    <v-card-subtitle v-if="comments.is_visible" id="text">{{ comments.content }}</v-card-subtitle>
                    <v-card-action>
                        <v-btn v-if="verifAdmin && comments.is_visible" @click=suppCom(comments.id)> Supprimer </v-btn>
                    </v-card-action>
                    <p v-if="comments.is_visible" id="id_com"> {{ comments.id }} </p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>


</template>ﬂ

<style scoped>
#picture {
    max-height: 350px;
    max-width: 350px;
}

#id_com {
    visibility: hidden;
}

#input_box {
    display: flex;
    justify-content: space-around;
}

#text {
    color: #6B9080;
}
</style>