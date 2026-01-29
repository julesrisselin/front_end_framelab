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

async function goToAccount() {
    router.push('/account');
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
                    <button @click=goToParticipations()> Toutes les participations </button>
                </li>
                <li>
                    <button @click=goToAccount()> Mon compte </button>
                </li>
            </ul>
        </nav>
    </header id="accueil">

    <h1> Ajouter une Participations ! </h1>
    <div>
        <br>
        <form action="http://localhost:3000/api/participations" enctype="multipart/form-data" method="post">
        <div class="form-group">
            <input type="file" class="form-control-file" name="uploaded_file_participations">
            <input type="text" class="id_participations" placeholder="id challenge" name="id_challenge">
            <input type="submit" value="Envoyer" class="btn btn-default">
        </div>
    </form>
    </div>

</template>

<style scoped></style>