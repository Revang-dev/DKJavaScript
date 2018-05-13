Projet Javascript 2018 de MEERSMAN Rudy et DUMINY Ga�tan en Master 1 IFI

I) Description du projet

Nous avons r�aliser une sorte de portage du Donkey Kong Classic (celui de borne d'arcade) en Javascript.
C'est un jeu de plateforme o� le but est d'escalader la structure afin d'atteindre Donkey Kong pour passer au niveau suivant.
Notre jeu est composer de trois niveaux qui tourne en boucle mais avec une diff�rence � partir du niveau 4, Donkey Kong poss�de une attaque sp�ciale.
A chaque fois que le personnage se fait toucher trois fois celui-ci meure et repart du d�but du niveau tant qu'il poss�de des vies.
Le joueur r�cup�re une vie quand il fini une boucle de trois niveaux.
D�s que le joueur meure, il y a une probabilit� pour que le marteau apparaisse dans le niveau.
Le marteau permet d'�liminer des tonneaux sur la plateforme sur laquelle se situe le joueur.

II) Contr�les du personnage

Au sol:
	- Les touches fl�ch�es gauche et droite pour se d�placer
	- La fl�che vers le haut pour sauter
	- La barre espace pour utiliser le marteau seulement s'il est pr�sent dans l'inventaire
	
Sur une �chelle:
	- La fl�che vers le haut pour monter
	- La fl�che vers le bas pour descendre
	
Dans les airs:
	- Les touches fl�ch�es gauche et droite pour se d�placer
	
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
- Les �chelles
- Le marteau
- L'attaque sp�ciale de Donkey Kong
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