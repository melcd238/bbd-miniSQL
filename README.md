# Projet de fin de cursus TheArenaProject sur les fondammentaux du génie logiciel réalisé en Node.js
# https://www.thearenaproject.co/
Ceci une version simplifiée d'une base de données.
Plus précisément, c'est un programme qui permet de persister des noms d'utilisateur sur le disque et de les rechercher par la suite.

## Fonctionnement du programme:
Lorsqu'on démarre le programme, celui-ci doit attendre des instructions passées sur l'entrée standard et réagir en conséquence.
Un préfixe miniSQL$  indique que le programme est en attente d'instruction.
Les trois instructions suivantes sont gérer :
INSERT
SELECT
EXIT

### Cloner le repository
### Installer les dépences 
### npm run build && npm run start. 
Création d'un dossier Dist et démarrage du programme.
La base de donnée va se créer et se remplir au fur et à mesure que vous allez insérer des usernames.
Le programme est en mesure de lire des instructions depuis un fichier qui fait office d'entrée standard via une redirection d'entrée, par exemple :$> cat instructions | npm run start  
ou via un pipe : $> echo -e "INSERT leo1\nINSERT leo2\n" | npm run start

### Exemples de fonctionnement:
 
miniSQL$ INSERT leo
added: id=1, username=leo

miniSQL$ SELECT julius
found 2 entries:
-> id=3, username=julius
-> id=4, username=julius
miniSQL$

miniSQL$ insert
illegal instruction: insert
usage: INSERT username
       SELECT [username]
       exit [code]
miniSQL$