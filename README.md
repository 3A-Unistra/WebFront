# Utilisation Git


## Gestion de branche

Créer une branche dans laquelle travailler sur sa tâche:

`git checkout -b "5-page-de-connexion"` où `5` est le numéro de l'issue et `page-de-connexion` la page concernée

`git branch` permet de vérifier sur quelle branche vous vous trouvez à tout moment ( en vert avec une *)


## Mettre sur le dépôt distant

`git add .` va add tous les fichiers

`git commit -m "commentaire expliquant le contenu du commit"`

`git push -u origin 5-page-de-connexion` pour mettre sur le dépôt distant 
( attention à ne pas mettre de guillements sur le nom de la branche cette fois)

`git status` permet à tout moment de vérifier l'avancée de la procédure, voir quels fichiers sont commit, etc.


## Finalisation de tâche

Lorsque vous pensez une tâche complétée, allez sur "merge requests" (colonne de gauche, sous issues),
puis "new merge request". Sélectionnez votre branche personnelle ( par exemple 5-page-de-connexion ) comme source,
et main comme branche cible.
Comme titre, mettez le numéro de votre tâche et son contenu, comme ceci "#5: password oublié tmp" 

Ne surtout pas cliquer sur "merge" plus bas, ce sera le rôle de Brice, 
qu'il faut donc mettre en tant que reviewer (via la colonne de droite) pour qu'il soit notifié
qu'il y ait une nouvelle merge request. Il approuvera (si Dieu veut hin) puis mergera lui-même,
et fermera en même temps votre branche personnelle utilisée (celle crée ligne 8)


