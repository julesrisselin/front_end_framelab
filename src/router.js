import { createMemoryHistory, createRouter } from 'vue-router'

import home from './Views/home.vue'
import currentChallenge from './Views/currentChallenge.vue'
import participations_infinite from './Views/participationsInfinite.vue'
import participation from './Views/participation.vue'
import login from './Views/login.vue'
import signIn from './Views/signin.vue'
import currentParticipations from './Views/currentParticipations.vue'
import account from './Views/account.vue'
import history from './Views/history.vue'
import moderator from './Views/moderator.vue'
import addChallenge from './Views/addChallenge.vue'
import Subparticipation from './Views/subparticipation.vue'


const routes = [
    {path: '/', component: home },
    {path: '/currentChallenge', component: currentChallenge},
    {path: '/participations', component: participations_infinite},
    {path: '/participation/:id', component: participation},
    {path: '/subparticipation', component: Subparticipation},
    {path: '/login', component: login},
    {path: '/signin', component: signIn},
    {path: '/currentParticipations', component: currentParticipations},
    {path: '/account', component: account},
    {path: '/history', component: history},
    {path: '/moderator/comments', component: moderator},
    {path: '/moderator', component: addChallenge}
]


const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

export default router