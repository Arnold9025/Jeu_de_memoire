### Jeu_de_memoire

## Fonctionnement du jeu
Le jeu consiste à trouver  des paires d'images en un temps record.

Les images cachées par un ? sont celles dont il faut trouver les paires. Elles sont placées aléatoirement dans la grille.

Une partie débute lorsque l'utilisateur clique sur le bouton choisis un theme et le nombre de cartes et le temps impartie est généré en fonction du nombre de page. le jeu prends fin si l'utilisatuer clique sur fin de la partie, si le temps imparti touche à sa fin ou si toutes les images ont été trouvé.
L'utilisateur peut jouer plusieurs parties jusqu'à ce qu'il décide de quitter.

À chaque nouvelle partie:
    On réinitialise la position des images aléatoirement.
    Toutes les images cachées sont affichées un laps de temps puis recouvertes;
    Le nombre de paires trouvées est remis à zéro ainsi que le temps écoulé.
    Le bouton affichant "Arrêter la partie" affiche maintenant le message initial "Nouvelle partie"

Durant la partie:
    L'utilisateur clique sur deux images;
    Les images s'affichent un laps de temps;
    Si les images sont différentes, elles sont cachées de nouveau, sinon elles restent affichées et on incrémente le nombre de paires trouvées.
    Durant ce temps, le nombre de secondes écoulées depuis le début de la partie courante s'accumule;
    Le bouton affichant initialement "Nouvelle partie" doit afficher "Arrêter la partie"
    La fin d'une partie est atteinte lorsque toutes les paires sont découvertes.

## Langages
Ce jeu a été entièrement programmé en JavaScript Es6, HTML et CSS


## Lancement
Cloner le repository,
Lancer le fichier index.HTML dans votre navigateur
