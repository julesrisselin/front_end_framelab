<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

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




    <form action="http://localhost:3000/api/votes" method="post">
        <div class="form-group">
            <input type="number" max="5" class="vote" placeholder="note de créativité" name="note_creativity">
            <input type="number" max="5" class="vote" placeholder="note de technique" name="note_technique">
            <input type="number"max="5" class="vote" placeholder="note respect du thème" name="note_on_theme">
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

</template>

<style scoped></style>