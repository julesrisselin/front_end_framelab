<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const authentification = ref(false);
const repSubChall = ref()
const dateStart = ref()
const dateEnd = ref()

async function Account() {
    const respAccount = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users/me", {
        credentials: "include"
    })

    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }
}

Account();

async function sendChall(event) {
    event.preventDefault();
    const form = event.target;
    const body = new FormData(form);
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/challenges', {
            method: "POST",
            credentials: "include",
            body,
        });
        const data = await response.json();
        if (data.success) {
            repSubChall.value = "Challenge ajouté";
        } else {
            repSubChall.value = "Mauvais format pour l'upload";
        }
    } catch (e) {
        console.error(e);
    }
}

const serverUrl = ref(import.meta.env.VITE_SERVER_URL)

</script>

<template>

    <h1> Ajoutez un Challenge ! </h1>
    <v-btn to="/account"> Mon compte </v-btn>
    <div>
        <br>
        <h4> {{ repSubChall }}</h4>
        <form @submit="sendChall" enctype="multipart/form-data">
            <div class="form-group">
                <v-card class="mx-auto" mawWidth="900">
                    <v-file-input type="file" label="Image du Challenge" class="form-control-file" name="uploaded_file"/>
                    <v-text-field type="text" placeholder="Title" name="title"/>
                    <v-text-field type="text" placeholder="Description" name="description"/>
                    <input type="date" class="date_start" placeholder="Date début du challenge" name="date_start">
                    <input type="date" class="date_end" placeholder="Date début du challenge" name="date_end">
                    <v-card-actions>
                        <v-spacer />
                        <v-btn type="submit" value="Envoyer"> Envoyer </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </form>
    </div>

</template>

<style scoped></style>