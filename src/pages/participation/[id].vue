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
const dataUserLog = ref();
const nb_total_com = ref();
const userData = ref("");
const repSubVotes = ref();
const URL_SERVEUR = ref(import.meta.env.VITE_SERVER_URL);

const paramsPart = new URLSearchParams();
paramsPart.append("id_participation", id_participation);



async function getData() {
    const respPart = await fetch(`http://localhost:3000/api/participations?${paramsPart}`)
    const dataPart = await respPart.json();
    participation.value = dataPart;

    const paramsUser = new URLSearchParams();
    paramsUser.append("user_id", participation.value.data.user_id);

    const respUser = await fetch(`http://localhost:3000/api/users?${paramsUser}`)
    const dataUser = await respUser.json();
    user.value = dataUser;

    const paramsComVotes = new URLSearchParams();
    paramsComVotes.append("id_participation", participation.value.data.id);

    const respComments = await fetch(`http://localhost:3000/api/comments?${paramsComVotes}`);
    const dataComments = await respComments.json();
    comments.value = dataComments;

    const respVotes = await fetch(`http://localhost:3000/api/votes?${paramsComVotes}`)
    const dataVotes = await respVotes.json();
    votes.value = dataVotes;

    const respVotesTotal = await fetch('http://localhost:3000/api/votes')
    const dataVotesTotal = await respVotesTotal.json();
    nb_total_com.value = dataVotesTotal.data.length;

    const respAccount = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users/me", {
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
    const response = await fetch(import.meta.env.VITE_SERVER_URL + "/api/comments", {
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
}

async function sendVotes() {
    if (userData.value.id == participation.value.data.user_id) {
        return repSubVotes.value == 0;
    } else {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + "/api/votes", {
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
            repSubVotes.value == true;
        }
    }
}

async function suppCom(id) {
    console.log(id);
    const response = await fetch(import.meta.env.VITE_API + "/comments", {
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
        <img :src="'http://localhost:3000/' + participation.data.picture_updated_url" id="picture"></img>
    </div>
    <div>
        <h3> Fait par {{ user.data.name }} {{ user.data.firstname }} le {{ participation.data.date_submission }}</h3>
    </div>
    <div>
        <h3> Pour le challenge N°{{ participation.data.id_challenge }} </h3>
    </div>

    <input type="number" v-model=note_creativity max="5" class="vote" placeholder="note de créativité"
        name="note_creativity">
    <input type="number" v-model=note_on_theme max="5" class="vote" placeholder="note de technique"
        name="note_technique">
    <input type="number" v-model=note_technique max="5" class="vote" placeholder="note respect du thème"
        name="note_on_theme">
    <button @click=sendVotes()> Envoyer </button>
    <h5 v-if="repSubVotes"> Vos votes ont bien été envoyés </h5>
    <h5 v-if="repSubVotes == 0"> Vous ne pouvez pas voter pour votre propre participation </h5>

    <br>

    <input type="text" v-model=commentaires class="comments" placeholder="Entrez un commentaires" name="comments">
    <button @click=sendComments()> Envoyer </button>

    <h4> Votes :</h4>
    <v-container id="votes">
        <v-row>
            <v-col v-for="(votes) in votes.data">
                <v-sheet>
                    <v-list>
                        <h5>
                            Compte N° {{ votes.user_id }}
                        </h5>
                        <ul>
                            Note de créativité : {{ votes.note_creativity }}
                        </ul>
                        <ul>
                            Note respect du thème : {{ votes.note_on_theme }}
                        </ul>
                        <ul>
                            Note de technique : {{ votes.note_technique }}
                        </ul>
                    </v-list>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>


    <h3> Commentaire :</h3>
    <h4> Nombre total de commentaires : {{ nb_total_com }}</h4>
    <li v-for="(comments) in comments.data">
        <h5 v-if="comments.is_visible"> Compte N° {{ comments.user_id }} </h5>
        <p v-if="comments.is_visible">{{ comments.content }}</p>
        <button v-if="verifAdmin && comments.is_visible" @click=suppCom(comments.id)> Supprimer </button>
        <h5 v-if="comments.is_visible" id="id_com"> {{ comments.id }} </h5>
    </li>


</template>

<style scoped>
#picture {
    max-height: 150px;
    max-width: 150px;
}

#id_com {
    visibility: hidden;
}

#votes {
    display: flex;
    justify-content: flex-start;
}
</style>