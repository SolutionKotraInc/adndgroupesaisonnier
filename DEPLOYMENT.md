# Guide de Déploiement - ADND Groupe Saisonnier

## 🚀 Options de Déploiement

### Option 1: Vercel (Recommandé)
1. **Créer un compte Vercel** : https://vercel.com
2. **Connecter le repository GitHub** (si vous avez un repo)
3. **Ou déployer directement depuis le dossier local** :
   ```bash
   npx vercel
   ```
4. **Suivre les instructions** et configurer les variables d'environnement

### Option 2: Netlify
1. **Créer un compte Netlify** : https://netlify.com
2. **Déployer depuis le dossier** :
   ```bash
   npm run build
   npx netlify deploy --prod --dir=.next
   ```

### Option 3: VPS/Serveur dédié
1. **Installer Node.js** sur le serveur
2. **Copier les fichiers** sur le serveur
3. **Installer les dépendances** :
   ```bash
   npm install
   ```
4. **Construire et démarrer** :
   ```bash
   npm run build
   npm start
   ```

## 🔧 Variables d'Environnement

Créer un fichier `.env.production` avec :
```
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

## 📁 Structure du Build

Le build génère :
- `.next/` - Fichiers optimisés
- `public/` - Assets statiques
- `out/` - Export statique (si configuré)

## 🌐 Configuration du Domaine

1. **Acheter un domaine** (ex: adndgroupesaisonnier.com)
2. **Configurer les DNS** pour pointer vers le service de déploiement
3. **Configurer SSL** (automatique avec Vercel/Netlify)

## 📊 Monitoring

- **Vercel Analytics** : Intégré automatiquement
- **Google Analytics** : Ajouter le code de tracking
- **Uptime monitoring** : Services comme UptimeRobot

## 🔄 Mises à jour

Pour mettre à jour le site :
1. **Modifier le code localement**
2. **Tester** avec `npm run dev`
3. **Déployer** avec la commande appropriée
4. **Vérifier** que tout fonctionne en production
