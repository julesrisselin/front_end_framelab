<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfos = ref([]);
const comments = ref([]);

async function getData() {
    const respAccount = await fetch(import.meta.env.VITE_SERVER_URL + "/api/users/me", {
        credentials: "include"
    })
    const dataUser = await respAccount.json();
    userInfos.value = dataUser;
    const paramsPart = new URLSearchParams();
    paramsPart.append("user_id", userInfos.value.id);

    const respPart = await fetch(`http://localhost:3000/api/comments?${paramsPart}`)
    const dataPart = await respPart.json();
    comments.value = dataPart;
   
}

async function suppCom(id) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + "/api/comments", {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            is_visible : 0,
        }),
    });
}


getData();

</script>

<template>

    <h1> Historique de vos commentaires </h1>

    <li v-for="(comments) in comments.data">
        {{ comments.content }}
        <button v-if="comments.is_visible" @click=suppCom(comments.id)> Supprimer </button>
    </li>
</template>

<style scoped>
#picture {
    max-height: 150px;
    max-width: 150px;
}
</style>