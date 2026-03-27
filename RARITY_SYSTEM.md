# 🎴 Système de Rareté - RavouGOAT

## Vue d'ensemble

RavouGOAT utilise un système de rareté à **6 niveaux** inspiré des jeux de gacha populaires.

## 📊 Les 6 Raretés (MODE SÉVÈRE)

| Rareté | Nom Complet | Taux | Couleur | Emoji |
|--------|-------------|------|---------|-------|
| **C** | Common | 70% | Gris (`#9ca3af`) | ⚪ |
| **R** | Rare | 20% | Vert (`#10b981`) | 🟢 |
| **SR** | Super Rare | 7% | Bleu (`#3b82f6`) | 🔵 |
| **SSR** | Super Super Rare | 2% | Violet (`#a855f7`) | 🟣 |
| **UR** | Ultra Rare | 0.8% | Or (`#fbbf24`) | 🟡 |
| **LR** | Legendary Rare | 0.2% | Rouge (`#ff0000`) | 🔴 |

## 🎲 Probabilités

Le système utilise un tirage aléatoire pondéré **SÉVÈRE** :

```typescript
const rarityChances = {
  C: 0.70,     // 70% - Très courant
  R: 0.20,     // 20% - Occasionnel
  SR: 0.07,    // 7%  - Rare
  SSR: 0.02,   // 2%  - Très rare
  UR: 0.008,   // 0.8% - Extrêmement rare !
  LR: 0.002    // 0.2% - Quasi mythique !
}
```

### Statistiques attendues

Pour **100 invocations**, vous devriez obtenir en moyenne :
- 70 cartes **C** (Common)
- 20 cartes **R** (Rare)
- 7 cartes **SR** (Super Rare)
- 2 cartes **SSR** (Super Super Rare)
- 0-1 carte **UR** (Ultra Rare) 🔥
- 0 carte **LR** (Legendary Rare) - Besoin de beaucoup de chance ! 🍀

### Chances cumulatives

**Pour obtenir au moins 1 LR :**

| Invocations | Chance d'obtenir au moins 1 LR |
|-------------|--------------------------------|
| 10 invocations | ~2.0% |
| 50 invocations | ~9.5% |
| 100 invocations | ~18.1% |
| 200 invocations | ~33.0% |
| 300 invocations | ~45.3% |
| 500 invocations | ~63.2% |

**Pour obtenir au moins 1 UR :**

| Invocations | Chance d'obtenir au moins 1 UR |
|-------------|--------------------------------|
| 10 invocations | ~7.7% |
| 50 invocations | ~33.5% |
| 100 invocations | ~55.7% |
| 200 invocations | ~80.2% |

## 🎨 Design visuel

Chaque rareté a un code couleur distinctif :
- Les bordures des cartes s'illuminent de la couleur de la rareté
- Les labels affichent le code (C, R, SR, etc.) et le nom complet
- Les statistiques en haut montrent vos totaux par rareté

## 🃏 Personnages par rareté

### C - Common (40%)
- Guerrier
- Mage

### R - Rare (30%)
- Archer
- Paladin
- Voleur

### SR - Super Rare (20%)
- Chevalier Noir
- Druide

### SSR - Super Super Rare (7%)
- Assassin
- Sage

### UR - Ultra Rare (2%)
- Dragon Knight

### LR - Legendary Rare (1%)
- Phoenix

## 🔧 Personnalisation

### Ajouter un nouveau personnage

1. Ajoutez l'image dans `/public/cards/`
2. Ajoutez l'entrée dans le tableau `characters` :

```typescript
{ 
  id: 12, 
  name: 'Votre Héros', 
  rarity: 'SSR',  // C, R, SR, SSR, UR, ou LR
  image: '/cards/votre-heros.png' 
}
```

### Modifier les probabilités

Éditez `rarityChances` dans `app/page.tsx`. Assurez-vous que la somme = 1.00 (100%) :

```typescript
const rarityChances = {
  C: 0.35,    // 35%
  R: 0.30,    // 30%
  SR: 0.20,   // 20%
  SSR: 0.10,  // 10%
  UR: 0.04,   // 4%
  LR: 0.01    // 1%
}
// Total = 1.00 ✅
```

### Ajouter une nouvelle rareté

Pour ajouter un niveau (par exemple "MLR" - Mythical Legendary Rare) :

1. **Type TypeScript** dans `app/page.tsx` :
```typescript
rarity: 'C' | 'R' | 'SR' | 'SSR' | 'UR' | 'LR' | 'MLR'
```

2. **Probabilité** :
```typescript
const rarityChances = {
  C: 0.40,
  R: 0.29,
  SR: 0.20,
  SSR: 0.07,
  UR: 0.02,
  LR: 0.015,
  MLR: 0.005  // 0.5%
}
```

3. **Couleur** dans `getRarityColor()` :
```typescript
case 'MLR': return '#ff1493'  // Rose vif
```

4. **Label** dans `getRarityLabel()` :
```typescript
case 'MLR': return 'Mythical Legendary Rare'
```

5. **Stats** (interface et affichage) :
```typescript
rarityCount: {
  // ... autres
  MLR: number
}
```

6. **API** dans `app/api/history/get/route.ts` :
```typescript
const rarityCount = {
  // ... autres
  MLR: 0,
}
```

## 📈 Système de pity (à implémenter)

Le système actuel n'a pas de "pity" (garantie après X invocations). Pour l'ajouter :

### Exemple de pity simple

```typescript
let pullsSinceLR = 0

const pullCharacterWithPity = (): Character => {
  pullsSinceLR++
  
  // Garantie LR après 100 invocations
  if (pullsSinceLR >= 100) {
    pullsSinceLR = 0
    return characters.find(c => c.rarity === 'LR')!
  }
  
  const char = pullCharacter()
  if (char.rarity === 'LR') {
    pullsSinceLR = 0
  }
  
  return char
}
```

## 💡 Conseils pour équilibrer

- **Trop facile ?** Réduisez les taux des hautes raretés
- **Trop difficile ?** Augmentez légèrement SSR/UR/LR
- **Plus de variété ?** Ajoutez plus de personnages par rareté
- **Système pity ?** Garantissez une haute rareté tous les X pulls

## 🎯 Références

Le système s'inspire de jeux populaires :
- **Genshin Impact** : 5★ (0.6%), 4★ (5.1%), 3★ (94.3%)
- **Honkai Star Rail** : SSR (0.6%), SR (5.1%), R (94.3%)
- **Fire Emblem Heroes** : 5★ (6%), 4★ (58%), 3★ (36%)

RavouGOAT en mode SÉVÈRE suit un modèle similaire aux gachas classiques, où obtenir une LR est un véritable exploit ! En moyenne, il faut **500 invocations** pour avoir 63% de chances d'obtenir une LR. 🔥
