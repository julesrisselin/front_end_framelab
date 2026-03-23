<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const email = ref("")
const password = ref("");
const connexion = ref(true);


async function checkConnexion() {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    });

    if (response.status == 200) {
        router.push('/');
        connexion.value = true;
    } else {
        connexion.value = false;
        router.push('/login')
    }

}

async function goToSignIn() {
    router.push('/signin');
}

</script>

<template>
   
    <input type="text" v-model="email" class="email" placeholder="email" name="email">
    <input type="text" v-model="password" class="password" placeholder="password" name="password">
    <button @click="checkConnexion()"> Se connecter </button>
    <div v-if= !connexion>
       <h3> Mot de passe ou email incorrect </h3>
    </div>
    <br>

    <button @click=goToSignIn()> Ici pour créer un compte </button>
</template>

<style scoped></style>