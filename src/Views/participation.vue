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

console.log(route.params.id)

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
    //console.log(dataVotes);
    votes.value = dataVotes;
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
                <li>
                    <button @click=goToLogin()> Connexion > </button>
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

    <form action="http://localhost:3000/api/votes" method="post">
        <div class="form-group">
            <input type="number" max="5" class="vote" placeholder="note de créativité" name="note_creativity">
            <input type="number" max="5" class="vote" placeholder="note de technique" name="note_technique">
            <input type="number" max="5" class="vote" placeholder="note respect du thème" name="note_on_theme">
            <input type="submit" value="Envoyer" class="btn btn-default">
        </div>
    </form>
    <br>
    <form action="http://localhost:3000/api/comments" method="post">
        <div class="form-group">
            <input type="text" class="comments" placeholder="Entrez un commentaires" name="comments">
            <input type="submit" value="Envoyer" class="btn btn-default">
        </div>
    </form>
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
        <h5> Compte N° {{  comments.user_id }} </h5>
        {{ comments.content }}
    </li>


</template>

<style scoped>
#picture {
    max-height: 150px;
    max-width: 150px;
}
</style>