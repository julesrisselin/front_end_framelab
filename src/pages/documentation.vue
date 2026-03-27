<template>

    <h1 id="title"> Documentation  Application Web Framelab </h1>
    <v-expansion-panels>

        <v-expansion-panel title="1. Barre de navigation">
            <v-expansion-panel-text>
                La barre de navigation située en haut de l’application permet d’accéder aux principales fonctionnalités.
                <br />
                Elle comporte cinq boutons :
                <v-list>
                    <v-list-item><strong> Accueil : </strong> permet de revenir à la page d’accueil.</v-list-item>
                    <v-list-item> <strong> Challenge : </strong> Affiche le challenge actuellement en cours.
                    </v-list-item>
                    <v-list-item><strong> Participations de la semaine : </strong> Affiche les participations du
                        challenge en cours uniquement.</v-list-item>
                    <v-list-item><strong> Toutes les participations : </strong> Permet de consulter l’ensemble des
                        participations publiées sur l’application.</v-list-item>
                </v-list>
            </v-expansion-panel-text>

        </v-expansion-panel>

        <v-expansion-panel title="2. Page d’accueil">
            <v-expansion-panel-text>
                La page d’accueil met en avant :
                <v-list>
                    <v-list-item><strong> - L’image du challenge en cours </strong></v-list-item>
                    <v-list-item> <strong> - Un bouton permettant d’accéder directement à la page du
                            challenge</strong></v-list-item>
                </v-list>
                Cette page permet aux utilisateurs de découvrir rapidement le challenge actif et d’y accéder en un clic.
            </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="3. Page du challenge en cours">
            <v-expansion-panel-text>
                Cette page présente toutes les informations nécessaires :
                <v-list>
                    <v-list-item><strong> - Le thème du challenge </strong> </v-list-item>
                    <v-list-item> <strong> - La description </strong></v-list-item>
                    <v-list-item><strong> - La date de début </strong></v-list-item>
                    <v-list-item><strong> - La date de fin </strong></v-list-item>
                </v-list>
                Deux actions principales sont disponibles :
                <br />
                - Participer : permet de soumettre une participation
                <br />
                - Les participations : permet de consulter les contributions des autres utilisateurs
            </v-expansion-panel-text>

        </v-expansion-panel>

        <v-expansion-panel title="4. Participation à un challenge">
            <v-expansion-panel-text>
                Chaque utilisateur peut soumettre une seule participation par challenge.
                <br />
                Étapes :
                <v-list>
                    <v-list-item><strong> 1) Cliquer sur le bouton Participer </strong> </v-list-item>
                    <v-list-item> <strong> 2) Sélectionner le fichier à envoyer (photo) </strong></v-list-item>
                    <v-list-item><strong> 3) Cliquer sur Envoyer </strong></v-list-item>
                </v-list>
            </v-expansion-panel-text>

        </v-expansion-panel>

        <v-expansion-panel title="5. Détail d’une participation">
            <v-expansion-panel-text>
                La page détail affiche :
                <v-list>
                    <v-list-item><strong> - Le nom de l’utilisateur</strong> </v-list-item>
                    <v-list-item> <strong> - La date de publication </strong></v-list-item>
                    <v-list-item><strong> - Le numéro du challenge </strong></v-list-item>
                </v-list>
                Les utilisateurs peuvent attribuer des notes selon trois critères :
                    ⭐ Créativité
                    ⭐ Respect du thème
                    ⭐ Technique
                    <br />
                Chaque critère est noté sur une échelle de 1 à 5.
                <br />
                Les utilisateurs peuvent également :
                <br />
                - Ajouter un commentaire
                <br />
                - Consulter les notes attribuées par les autres utilisateurs
                <br />
                - Lire les commentaires existants
                <br />
                Seuls les administrateurs peuvent supprimer les commentaires.
            </v-expansion-panel-text>

        </v-expansion-panel>

        <v-expansion-panel title="6. Page « Toutes les participations »">
            <v-expansion-panel-text>
                Cette page permet de consulter toutes les participations publiées sur l’application, tous challenges confondus.
                <br />
                Fonctionnalités disponibles :
                <v-list>
                    <v-list-item><strong> - Filtrer les participations par utilisateur </strong> </v-list-item>
                    <v-list-item> <strong> - Filtrer par numéro de challenge</strong></v-list-item>
                </v-list>
                Les participations sont affichées sous forme de photos accompagnées de leur date de publication.
            </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="7. Page « Mon compte »">
            <v-expansion-panel-text>
                Cette page permet uniquement de consulter les informations personnelles du compte utilisateur.
                <br />
                Aucune modification n’est possible depuis cette section.
            </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="8. Fonctionnalités Administrateur">
            <v-expansion-panel-text>
                Les administrateurs peuvent créer de nouveaux challenges ainsi que supprimer définitivement un commentaires.

                <h3> Création d’un challenge : </h3>
                Dans l’onglet “Mon Compte”
                <v-list>
                    <v-list-item><strong> 1 - Cliquer sur Ajouter un challenge </strong> </v-list-item>
                    <v-list-item> <strong> 2 - Renseigner : </strong>
                        <br />
                        - Image du challenge
                        <br />
                        - Thème
                        <br />
                        - Description
                        <br />
                        - Date de début
                        <br />
                        - Date de fin <br /></v-list-item>
                    <v-list-item><strong> 3 - Cliquer sur Envoyer </strong></v-list-item>
                </v-list>
                Le challenge devient alors visible pour l’ensemble des utilisateurs.
            </v-expansion-panel-text>

        </v-expansion-panel>
    </v-expansion-panels>
    
    <button id="btn-api" ><a :href="serverUrl + '/docs/'"> Documentation Technique </a></button>
</template>
<script setup>
import { ref } from 'vue';

const serverUrl = ref(import.meta.env.VITE_SERVER_URL)

</script>

<style scoped>

#title {
  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto 60px auto;
  padding-bottom: 10px;
  border-bottom: 3px solid #fff;
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

#btn-api{
    font-size: 16px;
    border-radius: 25px;
    padding: 10px;
    background-color: #CCE3DE;
    margin-top: 15px;
    margin-left: 84%;
}



</style>
