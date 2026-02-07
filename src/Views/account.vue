<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authentification = ref(false);
const userInfos = ref([]);
const verifAdmin = ref(false);

async function Account() {
    const respAccount = await fetch("http://localhost:3000/api/users/me",{
        credentials : "include"
    })
    if (respAccount.status === 200){
        authentification.value = true;
    } else {
        authentification.value = false;
    }

    const dataUser = await respAccount.json();
    userInfos.value = dataUser;

    if(userInfos.value.is_admin == 1){
        verifAdmin.value = true
    }
}

    async function goToCurrentChallenge(){
        router.push('/currentChallenge');
    }

    async function goToAccueil(){
        router.push('/');
    }

    async function goToCurrentParticipations(){
        router.push('/currentParticipations');
    }

    async function goToParticipations(){
        router.push('/participations');
    }

    async function goToLogin(){
        router.push('/login');
    }

    async function goToAccount(){
        router.push('/account');
    }

    async function goToHistory(){
        router.push('/history');
    }

    async function goToAddChallenge(){
        router.push('/moderator');
    }


Account();

</script>

<template>
    <header>
        <nav id="navbar">
            <ul>
                <li>
                    <button @click= goToAccueil()> Accueil </button>
                </li>
                <li>
                    <button @click= goToCurrentChallenge()> Challenge </button>
                </li>
                <li>
                    <button @click= goToCurrentParticipations()> Participations de la semaine </button>
                </li>
                <li>
                    <button @click= goToParticipations()> Toutes les participations </button>
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

    <li> <h1>Informations de votre compte </h1>
        <ul>
            Email : {{ userInfos.email }}
        </ul>
        <ul>
            Nom : {{ userInfos.name }}
        </ul>
        <ul>
            Prénom : {{ userInfos.firstname }}
        </ul>
        <ul>
            Date d'inscription : {{ userInfos.date_inscription }}
        </ul>
    </li>

    <button @click= goToHistory()> Voir mes Participations </button>

    <button v-if = verifAdmin @click=goToAddChallenge()> Administration</button>

</template>

<style scoped>
    
</style>