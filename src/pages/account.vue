<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authentification = ref(false);
const userInfos = ref([]);
const verifAdmin = ref(false);

async function Account() {
    const respAccount = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include"
    })
    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }

    const dataUser = await respAccount.json();
    userInfos.value = dataUser;

    if (userInfos.value.is_admin == 1) {
        verifAdmin.value = true
    }
}

async function goToAddChallenge() {
    router.push('/addChallenge');
}


Account();

</script>

<template>


    <li>
        <h1>Informations de votre compte </h1>
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



    <button v-if=verifAdmin @click=goToAddChallenge()> Ajouter un challenge </button>

</template>

<style scoped></style>