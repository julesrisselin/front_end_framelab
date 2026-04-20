<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const comments = ref([]);
const router = useRouter()


async function getComments() {
    const resp = await fetch(import.meta.env.VITE_SERVER_URL + "/api/comments")
    const data = await resp.json();
    comments.value = data.data;
}

async function goToAddChallenge() {
    router.push('/moderator');
}

getComments();
</script>

<template>

    <h1> Les commentaires </h1>
    <button @click=goToAddChallenge()> Ajouter un challenge ! </button>
    <div>
        <br>
        <li v-for="(comments) in comments">
            <div v-if="comments.is_visible === 1">
                <li>
                    {{ comments.content }}
                    <button @click=Unvisible()> Non visible </button>
                </li>
            </div>
    </li>
    </div>
    <br>

</template>

<style scoped></style>