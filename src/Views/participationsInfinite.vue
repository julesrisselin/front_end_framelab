<script setup> 
import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    
    const participationsInfos = ref([]);
    const router = useRouter()
    const route = useRoute()

    async function getParticipations() {
        const resp = await fetch("http://localhost:3000/api/participations")
        const data = await resp.json();
        participationsInfos.value = data;
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
    
    getParticipations();
</script>

<template>
<header>
            <nav>
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
                <li>
                    <button @click= goToLogin()> Connexion > </button>
                </li>
            </ul>
        </nav>
        </header id="accueil">

        <div> <h1> Toutes les Participations ! </h1></div>

        <p>{{ participationsInfos.data }}</p>

</template>

<style scoped> 


</style>