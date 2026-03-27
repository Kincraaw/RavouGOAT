# RavouGOAT ⚔️

Application web Next.js pour invoquer des personnages avec un système de gacha.

## 🎮 Fonctionnalités

- **Invocation x1** : Invoquez un personnage aléatoire
- **Invocation x10** : Invoquez 10 personnages d'un coup
- **Système de rareté à 6 niveaux (SÉVÈRE)** :
  - ⚪ C - Common (70%)
  - 🟢 R - Rare (20%)
  - 🔵 SR - Super Rare (7%)
  - 🟣 SSR - Super Super Rare (2%)
  - 🟡 UR - Ultra Rare (0.8%)
  - 🔴 LR - Legendary Rare (0.2%)
- **Animations** : Effets visuels lors des invocations
- **Statistiques détaillées** : Suivi du nombre d'invocations par rareté
- **Historique MongoDB** : Sauvegarde automatique de toutes vos invocations
  - Identification par IP (sans authentification)
  - Statistiques globales (total d'invocations, sessions, raretés obtenues)
  - Affichage complet de l'historique avec toutes les cartes

## 🚀 Installation

1. Créer un fichier `.env.local` à la racine avec votre URI MongoDB :
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/it8_card
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 🗄️ Capi/
│   │   └── history/
│   │       ├── get/route.ts    # API pour récupérer l'historique
│   │       └── save/route.ts   # API pour sauvegarder l'historique
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Page d'accueil avec système d'invocation
│   └── page.module.css   # Styles de la page
├── lib/
│   ├── mongodb.ts        # Configuration MongoDB
│   └── getClientIp.ts    # Utilitaire pour obtenir l'IP client
├── public/
│   └── cards/            # Images des personnages
├── .env.local            # Variables d'environnement (MongoDB URI)
- **Identification** : Par IP de l'utilisateur (pas de système de connexion requis)

### Structure des documents

```typescript
{
  _id: ObjectId,
  userIp: string,           // IP de l'utilisateur
  characters: Character[],  // Liste des personnages obtenus
  pullCount: number,        // Nombre d'invocations (1 ou 10)
  timestamp: Date          // Date et heure de l'invocation
}
```

### Note sur l'identification par IP

- ✅ Pas besoin d'authentification utilisateur
- ✅ Historique persistant entre les sessions
- ⚠️ Les utilisateurs derrière le même réseau partagent l'historique
- ⚠️ L'IP peut changer selon le FAI

## 📁 Structure

```
RavouGOAT/
├── app/
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Page d'accueil avec système d'invocation
│   └── page.module.css   # Styles de la page
├── public/
│   └── cards/            # Images des personnages
├── package.json
└── next.config.js
```

## 🎨 Personnalisation

### Ajouter vos propres cartes

1. Placez vos images dans le dossier `public/cards/`
2. Modifiez le tableau `characters` dans `app/page.tsx` :

```typescript
const characters: Character[] = [
  { id: 1, name: 'Votre Personnage', rarity: 'legendary', image: '/cards/votre-image.png' },
  // ...
]
```

### Modifier les probabilités

Ajustez les valeurs dans `rarityChances` dans `app/page.tsx` :

```typescript
const rarityChances = {
  C: 0.70,     // 70%
  R: 0.20,     // 20%
  SR: 0.07,    // 7%
  SSR: 0.02,   // 2%
  UR: 0.008,   // 0.8%
  LR: 0.002    // 0.2%
}
```

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Langage typé
- **CSS Modules** - Styles scopés
- **React Hooks** - Gestion d'état

## 📝 Notes

- Les images des cartes doivent être placées dans `public/cards/`
- Format recommandé : PNG ou JPG, ratio 2:3 (ex: 400x600px)
- Si une image n'existe pas, un placeholder sera affiché automatiquement