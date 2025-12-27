<script setup>
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    
    const pictureInfos = ref([]);
    const router = useRouter()
    const route = useRoute()
    
    
    async function getPicture() {
        const resp = await fetch("http://localhost:3000/api/challenges/current")
        const data = await resp.json();
        pictureInfos.value = data;
        console.log(pictureInfos);
    }
    
        async function goToCurrentParticipations(){
            router.push('/currentParticipations');
        }
    
    getPicture();
    
    </script>
    
    <template>
        <header>
            <nav>
                <ul>
                    <li>
                        <RouterLink to="/"> Accueil </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/currentChallenge"> Challenge </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/currentParticipations"> Participations de la semaine </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/participations"> Toutes les participations </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/login"> Connexion </RouterLink>
                    </li>
                </ul>
            </nav>
        </header id="accueil">
    
        <div id="picture">
            {{ pictureInfos.data.data.picture }}
        </div>

        <div> <h1> Challenge de la Semaine ! </h1></div>

        <div> <h3> {{ pictureInfos.data.data.title_theme }} </h3></div>
    
        <div id="scare">
            
            <h4> Thème </h4>
            <p>  {{ pictureInfos.data.data.title_theme }} </p>
            <h4> Description </h4>
            <p> {{ pictureInfos.data.data.description_theme }} </p>
            <h4> Date de début </h4>
            <p> {{ pictureInfos.data.data.date_start}} </p>
            <h4> Date de fin </h4>
            <p> {{ pictureInfos.data.data.date_end}} </p>

        </div>

        <div id="button_participations">
            <button @click= goToCurrentParticipations()> Les Photos > </button>
            </div>

    </template>
    
    <style scoped></style>