Projet Javascript 2018 de MEERSMAN Rudy et DUMINY Gaétan en Master 1 IFI

I) Description du projet

Nous avons réaliser une sorte de portage du Donkey Kong Classic (celui de borne d'arcade) en Javascript.
C'est un jeu de plateforme où le but est d'escalader la structure afin d'atteindre Donkey Kong pour passer au niveau suivant.
Notre jeu est composer de trois niveaux qui tourne en boucle mais avec une différence à partir du niveau 4, Donkey Kong possède une attaque spéciale.
A chaque fois que le personnage se fait toucher trois fois celui-ci meure et repart du début du niveau tant qu'il possède des vies.
Le joueur récupère une vie quand il fini une boucle de trois niveaux.
Dès que le joueur meure, il y a une probabilité pour que le marteau apparaisse dans le niveau.
Le marteau permet d'éliminer des tonneaux sur la plateforme sur laquelle se situe le joueur.

II) Contrôles du personnage

Au sol:
	- Les touches fléchées gauche et droite pour se déplacer
	- La flèche vers le haut pour sauter
	- La barre espace pour utiliser le marteau seulement s'il est présent dans l'inventaire
	
Sur une échelle:
	- La flèche vers le haut pour monter
	- La flèche vers le bas pour descendre
	
Dans les airs:
	- Les touches fléchées gauche et droite pour se déplacer
	
III) Qui a fait quoi ?

MEERSMAN & DUMINY :

- Les plateformes
- Les sprites
- Le joueur
- Le moteur de jeu

MEERSMAN :

- Les colisions
- Le load-image
- Donkey Kong
- Les animations
- La barre des scores
- Les levels

DUMINY :

- Le son
- Les tonneaux
- Les échelles
- Le marteau
- L'attaque spéciale de Donkey Kong
- Les listeners

IV) Les points forts / faibles

Points faibles :

- Gameplay non original
- La structure du code
- Pas de superposition de sons en dehors de la musique

Points forts :

- Forte ressemblance avec un jeu 8-bits
- Les collisions
- High-Score avec cookies
- Jeu fluide