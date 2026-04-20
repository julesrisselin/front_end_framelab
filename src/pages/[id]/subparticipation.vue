<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authentification = ref(false);
const respSubPart = ref();

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

async function sendPart() {
    const respChall = await fetch(import.meta.env.VITE_SERVER_URL + "/api/challenges/current")
    const dataChall = await respChall.json();
}

async function sendData(event) {
    event.preventDefault();
    const form = event.target;
    const body = new FormData(form);
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/participations', {
            method: "POST",
            credentials: "include",
            body,
        });
        const data = await response.json();
        if (data.success == false)
            respSubPart.value = data.message;
    } catch (e) {
        console.error(e);
    }
}
sendPart();

Account();

const serverUrl = ref(import.meta.env.VITE_SERVER_URL)
</script>

<template>
    <h1> Ajouter une Participations ! </h1>
    <div>
        <div>
            <h4>{{ respSubPart }} </h4>
            
        </div>
        <br>
        <form @submit="sendData" enctype="multipart/form-data">
            <div class="form-group">
                <v-card class="mx-auto" maxWidth="900">
                    <v-file-input type="file" label="Votre Image" class="form-control-file" name="uploaded_file" />
                    <input type="hidden" :value="$route.params.id" name="id_challenge">
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