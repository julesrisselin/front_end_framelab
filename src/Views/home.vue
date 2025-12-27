<script setup>
  import { ref } from 'vue'
  const votes = ref([]);
  const selectValue = ref([]);
  
  async function init (){
      const resp = await fetch("http://localhost:3000/api/votes/2")
      const data = await resp.json();
      votes.value = data;
  }
  
  init();
  
  
  import { computed } from 'vue'
      import { useRoute, useRouter } from 'vue-router'
      
      const router = useRouter()
      const route = useRoute()
      
      const search = computed({
        get() {
          return route.query.search ?? ''
        },
        set(search) {
          router.replace({ query: { search } })
        }
      })  
  </script>
  
  <template>
      <header> 
          <nav>
              <ul>
              <li><RouterLink to="/"> Accueil </RouterLink></li>
              <li><RouterLink to="/participation"> Challenge </RouterLink></li>
              <li> <RouterLink to="/participations"> Participations </RouterLink></li>
              <li> <RouterLink to="/login"> Connexion </RouterLink></li>
              </ul>
          </nav> 
      </header id="accueil">
          <div id="first_scare">
  
          </div>
          <div id="second_scare">
              <h2>CHALLENGE DE LA SEMAINE !</h2>
              <h3> (THÈME DE LA SEMAINE) </h3>
  
          </div>
          <div id="img_accueil">
              <img src="@/assets/images/accueil/accueil.jpg"> </img>
          </div>
  
      <section>
  
  
  
      </section>
  
  
  
  
  
      <select id="select" v-model="selectValue"> 
          <option v-for ="(vote, i) in votes" :value ="vote">
              {{ vote.note_technique }}
          </option>
      </select>
  </template>
  
  <style scoped></style>
  