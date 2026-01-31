<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute();
const router = useRouter();
const id_participation = route.params.id;
const participation = ref([]);
const user = ref([]);
const comments = ref([]);
const votes = ref([]);
const authentification = ref(false);
const userInfos = ref([]);
const commentaires = ref("");

const note_creativity = ref(0);
const note_on_theme = ref(0);
const note_technique = ref(0);


const paramsPart = new URLSearchParams();
paramsPart.append("id_participation", id_participation);



async function getData() {
    const respPart = await fetch(`http://localhost:3000/api/participations?id_participation=${paramsPart}`)
    const dataPart = await respPart.json();
    participation.value = dataPart;

    const paramsUser = new URLSearchParams();
    paramsUser.append("user_id", participation.value.data.user_id);

    const respUser = await fetch(`http://localhost:3000/api/users?user_id=${paramsUser}`)
    const dataUser = await respUser.json();
    user.value = dataUser;

    const paramsComVotes = new URLSearchParams();
    paramsComVotes.append("id", participation.value.data.id);

    const respComments = await fetch(`http://localhost:3000/api/comments/:id${paramsComVotes}`);
    const dataComments = await respComments.json();
    comments.value = dataComments;

    const respVotes = await fetch(`http://localhost:3000/api/votes/:id${paramsComVotes}`)
    const dataVotes = await respVotes.json();
    votes.value = dataVotes;

    const respAccount = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include"
    })

    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }

    const userData = await respAccount.json();
    userInfos.value = userData;
}

async function sendComments() {
    const response = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_participations: id_participation,
            user_id: userInfos.value.id,
            content: commentaires.value
        }),
    });
}

async function sendVotes() {
    const response = await fetch("http://localhost:3000/api/votes", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_participations: id_participation,
            user_id: userInfos.value.id,
            note_creativity: note_creativity.value,
            note_on_theme: note_on_theme.value,
            note_technique: note_technique.value,
        }),
    });
}


async function goToCurrentChallenge() {
    router.push('/currentChallenge');
}

async function goToAccueil() {
    router.push('/');
}

async function goToCurrentParticipations() {
    router.push('/currentParticipations');
}

async function goToAllParticipations() {
    router.push('/participations');
}

async function goToLogin() {
    router.push('/login');
}

async function goToAccount() {
    router.push('/account');
}

getData();
</script>

<template>
    <header>
        <nav>
            <ul>
                <li>
                    <button @click=goToAccueil()> Accueil </button>
                </li>
                <li>
                    <button @click=goToCurrentChallenge()> Challenge </button>
                </li>
                <li>
                    <button @click=goToCurrentParticipations()> Participations de la semaine </button>
                </li>
                <li>
                    <button @click=goToAllParticipations()> Toutes les participations </button>
                </li>
                <li v-if="!authentification">
                    <button @click=goToLogin() id="Account"> Connexion > </button>
                </li>
                <li v-else>
                    <button @click=goToAccount() id="Account"> Mon compte > </button>
                </li>
            </ul>
        </nav>
    </header id="accueil">

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
    <button @click=sendVotes() id=""> Envoyer </button>


    <br>

    <input type="text" v-model=commentaires class="comments" placeholder="Entrez un commentaires" name="comments">
    <button @click=sendComments() id=""> Envoyer </button>

    <h4> Votes :</h4>
    <li v-for="(votes) in votes.data">
        <h5> Compte N° {{ votes.user_id }} </h5>
        <ul>
            Note de créativité : {{ votes.note_creativity }}
        </ul>
        <ul>
            Note respect du thème : {{ votes.note_on_theme }}
        </ul>
        <ul>
            Note de technique : {{ votes.note_technique }}
        </ul>
    </li>


    <h4> Commentaire :</h4>
    <li v-for="(comments) in comments.data">
        <h5> Compte N° {{ comments.user_id }} </h5>
        {{ comments.content }}
    </li>


</template>

<style scoped>
#picture {
    max-height: 150px;
    max-width: 150px;
}
</style>