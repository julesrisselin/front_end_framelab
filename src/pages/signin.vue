<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const newUser = ref({})
const showLink = ref(false);
const token = ref("");

async function sendData() {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser.value),
        });
        const data = await response.json();
        if (data.success) {
            token.value = data.token;
            showLink.value = true;
        }
    } catch (e) {
        console.error(e);
    }
}

</script>

<template>
    <div id="formSignIn">
        <v-card class="mx-auto" maxWidth="500">
            <v-card-text>
                <v-text-field v-model="newUser.email" type="text" class="email" placeholder="email" name="email" />
                <v-text-field v-model="newUser.password" type="password" class="password" placeholder="password"
                    name="password" />
                <v-text-field v-model="newUser.name" type="text" class="name" placeholder="name" name="name" />
                <v-text-field v-model="newUser.firstname" type="text" class="firstname" placeholder="prénom"
                    name="firstname" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="sendData">Envoyer</v-btn>
            </v-card-actions>
        </v-card>
        <router-link :to="'/validation/' + token" v-if="showLink"> Veuillez cliquez sur le lien suivant pour valider votre compte</router-link> 
    </div>
</template>

<style scoped></style>