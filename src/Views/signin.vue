<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

async function goToCurrentChallenge() {
    router.push('/currentChallenge');
}

async function goToAccueil() {
    router.push('/');
}

async function goToCurrentParticipations() {
    router.push('/currentParticipations');
}

async function goToParticipations() {
    router.push('/participations');
}

async function goToLogin() {
    router.push('/moderator/comments');
}
</script>

<template>
    <header>
        <nav id="navbar">
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
                    <button @click=goToParticipations()> Toutes les participations </button>
                </li>
                <li>
                    <button @click=goToLogin()> Connexion > </button>
                </li>
            </ul>
        </nav>
    </header>
    <form action="http://localhost:3000/api/users" method="post">
        <div class="form-group">
            <input type="text" class="email" placeholder="email" name="email">
            <input type="text" class="password" placeholder="password" name="password">
            <input type="text" class="name" placeholder="name" name="name">
            <input type="text" class="firstname" placeholder="prénom" name="firstname">
            <input type="submit" value="Envoyer" class="btn btn-default"></input>
        </div>
    </form>
</template>

<style scoped></style>