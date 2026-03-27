<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authentification = ref(false);
const userInfos = ref([]);
const verifAdmin = ref(false);

async function Account() {
    const respAccount = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users/me", {
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



    

    <v-btn v-if=verifAdmin to="/addChallenge" id="btn-nav"> Ajouter un Challenge </v-btn>
    <br />
    <v-btn to="/historypart" id="btn-nav"> Historique de mes Participations </v-btn>
    <br />
    <v-btn to="/historycom" id="btn-nav"> Historique de mes Commentaires </v-btn>

</template>

<style scoped></style>