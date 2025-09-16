# 🚀 Déploiement Rapide - ADND Groupe Saisonnier

## ✅ Prérequis
- Node.js installé
- Compte Vercel ou Netlify (gratuit)

## 🎯 Déploiement en 3 étapes

### 1. Vérifier que tout fonctionne
```bash
npm run build
npm start
# Tester sur http://localhost:3000
```

### 2. Choisir une plateforme

#### Option A: Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Suivre les instructions
# Le site sera disponible sur https://votre-projet.vercel.app
```

#### Option B: Netlify
```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Déployer
netlify deploy --prod --dir=.next

# Suivre les instructions
```

### 3. Configurer le domaine personnalisé
1. Acheter un domaine (ex: adndgroupesaisonnier.com)
2. Dans Vercel/Netlify, ajouter le domaine
3. Configurer les DNS selon les instructions

## 🔧 Configuration finale

### Variables d'environnement
Ajouter dans Vercel/Netlify :
```
NEXT_PUBLIC_SITE_URL=https://adndgroupesaisonnier.com
```

### SSL
- Automatique avec Vercel/Netlify
- Vérifier que le cadenas vert apparaît

## 📊 Monitoring
- Vercel Analytics (automatique)
- Google Analytics (à ajouter)
- Uptime monitoring

## 🎉 C'est tout !
Votre site est maintenant en ligne et accessible au monde entier !
