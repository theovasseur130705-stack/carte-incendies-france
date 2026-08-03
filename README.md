# Carte Incendies France — Netlify

## Déploiement
1. Dépose **tout le contenu de ce dossier** dans un dépôt GitHub.
2. Dans Netlify : Add new site > Import an existing project > GitHub.
3. Ne renseigne pas de commande de build. Le dossier de publication est `.`.
4. La variable `FIRMS_MAP_KEY` doit déjà être présente dans Netlify.
5. Déploie.

## Vérification
Ouvre `https://TON-SITE.netlify.app/api/fires?days=2`. Tu dois voir un tableau JSON.

Les fonctions protègent la clé NASA ; ne l'ajoute jamais dans `index.html`.
