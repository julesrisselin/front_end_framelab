<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const pictureInfos = ref([]);
const router = useRouter()
const authentification = ref(false);
const check_image_accueil = ref(false);

async function getPicture() {
    const resp = await fetch("http://localhost:3000/api/challenges/current")
    const data = await resp.json();
    pictureInfos.value = data;


    if (pictureInfos.value.success == false) {
        check_image_accueil.value = false;
    } else {
        check_image_accueil.value = true;
    }


    const respAccount = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include"
    })

    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }
}

async function LogOut() {
    const resp = await fetch("http://localhost:3000/api/auth/logout", {
        credentials: "include"
    })
    const data = await resp.json();
    console.log(data);


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

async function goToLogin() {
    router.push('/login');
}

async function goToAccount() {
    router.push('/account');
}




getPicture();

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
                <li id="dropnav">
                    <button> Participations </button>
                    <ul id="subnav">
                        <li>
                            <button @click=goToCurrentParticipations()> Participations de la semaine </button>
                        </li>
                        <li>
                            <button @click=goToParticipations()> Toutes les participations </button>
                        </li>
                    </ul>
                </li>
                <li v-if="!authentification" id="account">
                    <button @click=goToLogin()> Connexion </button>
                </li>
                <li v-else id="account">
                    <button @click=goToAccount()> Mon compte </button>
                    <button @click=LogOut()> Déconnexion </button>
                </li>
            </ul>
        </nav>
    </header>

    <div id="img_accueil">
        <img src="@/assets/images/accueil/accueil.jpg"> </img>
    </div>

    <div v-if = pictureInfos.data.picture id="first_scare">
        <div id="second_scare">
            <img :src="'http://localhost:3000/' + pictureInfos.data.picture"></img>
        </div>
        <h2> {{ pictureInfos.data.title_theme }} </h2>
        <h4> {{ pictureInfos.data.description_theme }} </h4>
        <button @click=goToCurrentChallenge()> Voir plus </button>
    </div>
</template>

<style scoped>
#navbar {
    background-color: #6B9080;
    border-radius: 45px;
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    position: relative;
    display: block;
}

#navbar button {
    background-color: #FFFFFF;
    border-radius: 45px;
    padding: 13px;
    border-color: #FFFFFF;
    font-family: 'Times New Roman', Times, serif;
    font-size: 13px;

}

#dropnav {
    position: relative;
}

#subnav {
    display: none;
    position: absolute;
}

.dropnav:hover.subnav {
    display: block;
}

ul {
    align-items: center;
    display: flex;
    list-style: none;
    padding: 40px;
    margin: 40px;
    justify-content: baseline;
    gap: 30px;
}

#account {
    margin-left: 45%;
}
</style>