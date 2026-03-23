<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authentification = ref(false);

async function Account() {
    const respAccount = await fetch("http://localhost:3000/api/users/me",{
        credentials : "include"
    })
    
    if (respAccount.status === 200){
        authentification.value = true;
    } else {
        authentification.value = false;
    }
}

async function sendPart(){
    const respChall = await fetch("http://localhost:3000/api/challenges/current")
    const dataChall = await respChall.json();
    dataChall.data.id


    
}

sendPart();

Account();
</script>

<template>

    <h1> Ajouter une Participations ! </h1>
    <div>
        <br>
        <form action="http://localhost:3000/api/participations" enctype="multipart/form-data" method="post">
        <div class="form-group">
            <input type="file" class="form-control-file" name="uploaded_file_participations">
            <input type="hidden" :value="$route.params.id" name="id_challenge">
            <input type="submit" value="Envoyer" class="btn btn-default">
        </div>
    </form>
    </div>

</template>

<style scoped></style>