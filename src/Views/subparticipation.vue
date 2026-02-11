<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authentification = ref(false);

async function Account() {
    const respAccount = await fetch("http://localhost:3000/api/users/me",{
        credentials : "include"
    })
    
    if (respAccount.status === 200){
        authentification.value = true;
    } else {
        authentification.value = false;
    }
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

async function goToParticipations() {
    router.push('/participations');
}

async function goToLogin(){
        router.push('/login');
    }

async function goToAccount() {
    router.push('/account');
}

Account();
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
                <li v-if="!authentification">
                    <button @click= goToLogin() id="Account">  Connexion </button>
                </li>
                <li v-else>
                    <button @click= goToAccount() id="Account"> Mon compte </button>
                </li>
            </ul>
        </nav>
    </header>

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