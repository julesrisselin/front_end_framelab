<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const router = useRouter()
const authentification = ref(false);

async function Account() {
    const respAccount = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include"
    })

    if (respAccount.status === 200) {
        authentification.value = true;
    } else {
        authentification.value = false;
    }
}

Account();

</script>

<template>

    <h1> Informations de votre Compte ! </h1>
    <v-btn to="/account"> Mon compte  </v-btn>
    <div>
        <br>
        <form action="http://localhost:3000/api/challenges" enctype="multipart/form-data" method="post">
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