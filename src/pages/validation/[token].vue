<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();

const token = route.params.token;
const showValidation = ref();

async function validUser() {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users", {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
        }),
    });
    const data = await response.json();

    if (data.success) {
        showValidation.value = true
    } else {
        showValidation.value = false
    }
}

validUser();
</script>

<template>

    <div v-if="showValidation">
        <h2> Votre compte a bien été créer vous pouvez vous connectez avec le bouton ci-dessous</h2>
        <v-btn to="/login" class="mr-4" id="btn-nav-connexion"> CONNEXION </v-btn>
    </div>

    <div v-if="!showValidation">
        <h2> Votre compte n'a pas pu être validé, veuillez recréer votre compte ci dessous</h2>
        <v-btn to="/signin" class="mr-4" id="btn-nav-connexion"> CRÉER VOTRE COMPTE </v-btn>
    </div>


</template>


<style scoped></style>