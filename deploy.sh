#!/bin/bash

# Script de déploiement pour ADND Groupe Saisonnier
echo "🚀 Déploiement du site ADND Groupe Saisonnier..."

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire du projet."
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Construire le projet
echo "🔨 Construction du projet..."
npm run build

# Vérifier que le build a réussi
if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# Option 1: Déploiement Vercel
if command -v vercel &> /dev/null; then
    echo "🌐 Déploiement sur Vercel..."
    npx vercel --prod
elif command -v netlify &> /dev/null; then
    echo "🌐 Déploiement sur Netlify..."
    npx netlify deploy --prod --dir=.next
else
    echo "📋 Aucun CLI de déploiement détecté."
    echo "Options disponibles :"
    echo "1. Installer Vercel CLI: npm i -g vercel"
    echo "2. Installer Netlify CLI: npm i -g netlify-cli"
    echo "3. Déployer manuellement en uploadant le dossier .next"
fi

echo "🎉 Déploiement terminé !"
