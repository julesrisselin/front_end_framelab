<script setup>
    import { useRoute, useRouter } from 'vue-router'

    const router = useRouter();

    async function goToSignIn() {
        router.push('/signin');
    }
</script>

<template>
    <form action="http://localhost:3000/api/auth/login" method="post">
        <div class="form-group">
            <input type="text" class="email" placeholder="email" name="email">
            <input type="text" class="password" placeholder="password" name="password">
            <input type="submit" value="Envoyer" class="btn btn-default"></input>
        </div>
    </form>
    <br>

    <button @click=goToSignIn()> Ici pour créer un compte </button>
</template>

<style scoped></style>