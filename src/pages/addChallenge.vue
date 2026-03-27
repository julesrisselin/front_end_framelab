<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const authentification = ref(false);

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

const serverUrl = ref(import.meta.env.VITE_SERVER_URL)

</script>

<template>

    <h1> Informations de votre Compte ! </h1>
    <v-btn to="/account"> Mon compte  </v-btn>
    <div>
        <br>
        <form :action="serverUrl + '/api/challenges'" enctype="multipart/form-data" method="post">
            <div class="form-group">
                <input type="file" class="form-control-file" name="uploaded_file">
                <input type="text" class="title" placeholder="Title" name="title">
                <input type="text" class="description" placeholder="Description" name="description">
                <input type="date" class="date_start" placeholder="Date début du challenge" name="date_start">
                <input type="date" class="date_end" placeholder="Date début du challenge" name="date_end">
                <input type="submit" value="Envoyer" class="btn btn-default">
            </div>
        </form>
    </div>

</template>

<style scoped></style>