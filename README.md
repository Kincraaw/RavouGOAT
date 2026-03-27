# RavouGOAT ⚔️

Application web Next.js pour invoquer des personnages avec un système de gacha.

## 🎮 Fonctionnalités

- **Invocation x1** : Invoquez un personnage aléatoire
- **Invocation x10** : Invoquez 10 personnages d'un coup
- **Système de rareté** :
  - ⚪ Commun (60%)
  - 🔵 Rare (30%)
  - 🟣 Épique (9%)
  - 🟡 Légendaire (1%)
- **Animations** : Effets visuels lors des invocations
- **Statistiques** : Suivi du nombre d'invocations

## 🚀 Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

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
  common: 0.60,    // 60%
  rare: 0.30,      // 30%
  epic: 0.09,      // 9%
  legendary: 0.01  // 1%
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