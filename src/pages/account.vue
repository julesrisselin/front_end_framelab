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

    <div id="infos">
        <v-card variant="tonal" width="500px">
            <v-card-title>
                Informations de votre compte
            </v-card-title>
            <v-card-subtitle>
                Nom : {{ userInfos.name }}
                <br>
                Prénom : {{ userInfos.firstname }}
                <br>
                Email : {{ userInfos.email }}
            </v-card-subtitle>
            <v-card-text>
                Date d'inscription : {{ userInfos.date_inscription }}
            </v-card-text>
        </v-card>





        <div id="box-btn">
            <v-btn v-if=verifAdmin to="/addChallenge" id="btn"> Ajouter un Challenge </v-btn>
            <br />
            <v-btn to="/historypart" id="btn"> Historique de mes Participations </v-btn>
            <br />
            <v-btn to="/historycom" id="btn"> Historique de mes Commentaires </v-btn>
        </div>
    </div>
</template>

<style scoped>
#box-btn {
    display: flex;
    justify-content: baseline;
    margin: auto;
    
}

#btn {
    color: #6B9080;
    min-height: 55px;
    min-width: 140px;
    border-radius: 20px;
    font-weight: bold;
    background-color: #edf1ef;
}

#infos {
    display: flex;
    justify-content: center;
    
    
    
}
</style>