<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const email = ref("")
const password = ref("");
const connexion = ref(true);


async function checkConnexion() {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + "/api/auth/login", {
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
    <div id="formSignIn">
        <v-card class="mx-auto" maxWidth="500">
            <v-card-text>
                <v-text-field v-model="email" type="text" class="email" placeholder="email" name="email" />
                <v-text-field v-model="password" type="password" class="password" placeholder="password"
                    name="password" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="checkConnexion()">Se Connecter</v-btn>
            </v-card-actions>
        </v-card>
        <div v-if=!connexion>
            <h3> Mot de passe ou email incorrect </h3>
        </div>
    </div>

    <button @click=goToSignIn()> Ici pour créer un compte </button>
</template>

<style scoped></style>