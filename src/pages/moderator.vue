<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const comments = ref([]);
const router = useRouter()


async function getComments() {
    const resp = await fetch("http://localhost:3000/api/comments")
    const data = await resp.json();
    comments.value = data;
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
        <li v-for="(comments) in comments.data">
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