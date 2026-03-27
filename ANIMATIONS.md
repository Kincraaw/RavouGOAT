# 🎬 Système d'Animations - RavouGOAT

## Vue d'ensemble

L'application inclut maintenant un système d'animations complet pour rendre l'expérience d'invocation immersive et spectaculaire !

## ✨ Animations d'Invocation

### 1. Overlay Fullscreen
- **Effet** : Fond semi-transparent qui couvre tout l'écran
- **Durée** : Apparaît en 0.3s avec fade-in
- **Fond** : Dégradé bleu foncé avec effet de flou

### 2. Cercle Magique d'Invocation
Deux cercles concentriques animés :

#### Cercle Intérieur
- **Taille** : 150px
- **Couleur** : Or (#fbbf24)
- **Animation** : Pulsation avec glow (luminescence)
- **Effet** : Scale de 1 à 1.1 toutes les 1.5s

#### Cercle Extérieur
- **Taille** : 250px
- **Couleur** : Violet (#a855f7)
- **Animation** : Rotation continue à 360°
- **Effet** : Bordure translucide qui tourne

### 3. Particules Scintillantes
- **Nombre** : 20 particules
- **Distribution** : Cercle à 360° autour du centre
- **Animation** : Explosion radiale vers l'extérieur
- **Effet** : Apparaissent, montent et disparaissent (0 → 200px)
- **Timing** : Delay échelonné (0.05s par particule)

### 4. Texte Animé
- **Texte** : "Invocation en cours..."
- **Effet** : Shimmer (brillance oscillante)
- **Couleur** : Dégradé or animé
- **Animation** : Brightness 1 → 1.5 toutes les 2s

### 5. Barre d'Énergie
- **Largeur** : 300px
- **Animation** : Remplissage progressif 0% → 100%
- **Effet** : Dégradé or qui se déplace
- **Durée** : 2s avec boucle infinie

### 6. Flash de Révélation
- **Timing** : Apparaît après 1.5s d'invocation
- **Effet** : Explosion de lumière dorée
- **Animation** : Scale 0 → 3 avec fade out
- **Durée** : 0.7s
- **Impact** : Signale l'arrivée des cartes

## 🎴 Animations des Cartes

### Apparition des Cartes
- **Effet** : Rotation 3D (180° → 0°) + Scale + Translation
- **Timing** : 0.8s par carte
- **Delay** : 0.1s entre chaque carte (effet cascade)
- **Phases** :
  1. Départ : Petite, tournée, en bas (opacity 0)
  2. Milieu : Overscale (1.1) avec léger tilt
  3. Fin : Position normale avec rotation 0°

### Effet de Brillance (Shine)
- **Type** : Rayon de lumière qui traverse la carte
- **Animation** : Diagonal (45°) de gauche à droite
- **Durée** : 3s en boucle
- **Delay** : Commence après 1s
- **Couleur** : Blanc semi-transparent

### Hover sur Carte
- **Translation** : -10px vers le haut
- **Scale** : 1.05
- **Rotation** : 2° sur l'axe Z
- **Shadow** : Ombre portée amplifiée

## 🎯 Animations des Boutons

### Boutons d'Invocation
- **Hover** : 
  - Translation Y : -3px
  - Scale : 1.02
  - Shadow amplifiée
- **Active (clic)** :
  - Effet ripple (onde circulaire blanche)
  - Translation Y : -1px
  - Scale : 0.98

### Animation de l'Icône
- **Floating** : Animation continue haut-bas (±5px)
- **Durée** : 2s en boucle
- **Au clic** : Pop (scale 1.3) avec rotation 10°

## 📊 Animations des Statistiques

### Cartes de Stats
- **Apparition** : Fade in + Translation Y (20px → 0)
- **Delay échelonné** : 0.1s, 0.2s, 0.3s, etc.
- **Hover** : Translation Y -3px + bordure dorée

### Valeurs Numériques
- **Animation** : Pulsation légère (scale 1 → 1.05)
- **Durée** : 2s en boucle
- **Effet** : Donne l'impression que les stats "respirent"

## 📱 Responsive Mobile

Adaptations pour petits écrans :
- **Cercles réduits** : 200px au lieu de 250px
- **Particules moins larges** : 300px au lieu de 400px
- **Texte plus petit** : 1.5rem au lieu de 1.8rem
- **Barre d'énergie** : 250px au lieu de 300px
- **Grid des stats** : 2 colonnes au lieu de 6

## ⏱️ Timeline Complète d'une Invocation

```
0.0s  → Clic sur le bouton
0.0s  → Overlay apparaît (fade in 0.3s)
0.0s  → Cercles commencent à tourner
0.0s  → Particules explosent
0.0s  → Barre d'énergie se remplit
1.5s  → Flash de révélation (0.7s)
2.2s  → Cartes apparaissent en cascade
2.2s  → Overlay disparaît
2.2s  → Titre "Résultats" apparaît
2.3s+ → Cartes continuent à apparaître (0.1s entre chaque)
```

## 🎨 Couleurs des Animations

| Élément | Couleur Principale | Effet |
|---------|-------------------|-------|
| Cercle intérieur | #fbbf24 (Or) | Glow pulsant |
| Cercle extérieur | #a855f7 (Violet) | Rotation |
| Particules | #fbbf24 (Or) | Radial gradient |
| Flash révélation | #fbbf24 (Or) | Radial gradient |
| Barre énergie | #fbbf24 → #f59e0b | Dégradé animé |
| Texte invocation | #fbbf24 | Dégradé shimmer |

## 🎭 Personnalisation

### Modifier la durée de l'invocation

Dans `app/page.tsx` :
```typescript
// Durée avant le flash de révélation
setTimeout(() => {
  setShowReveal(true)
}, 1500) // Modifier ici (en ms)

// Durée totale avant l'affichage des cartes
setTimeout(() => {
  setPulledCharacters(newCharacters)
  // ...
}, 2200) // Modifier ici (en ms)
```

### Modifier le nombre de particules

Dans `app/page.tsx` :
```typescript
{[...Array(20)].map((_, i) => ( // Changer 20
```

### Modifier les couleurs

Dans `app/page.module.css`, recherchez :
- `#fbbf24` pour changer l'or
- `#a855f7` pour changer le violet
- `rgba(251, 191, 36, X)` pour les variantes translucides

### Accélérer/Ralentir les animations

Recherchez `animation:` dans le CSS et ajustez les durées :
```css
animation: nom 2s ease-in-out; /* Changer 2s */
```

## 💡 Conseils de Performance

- Les animations CSS sont optimisées GPU via `transform` et `opacity`
- `backdrop-filter: blur()` peut être lourd sur mobile
- Les 20 particules sont un bon compromis (augmenter peut ralentir)
- L'overlay fullscreen utilise `position: fixed` pour de meilleures perfs

## 🚀 Améliorations Futures Possibles

1. **Sons** : Ajouter des effets sonores (whoosh, ding, etc.)
2. **Vibration** : API Vibration pour mobile au moment du reveal
3. **Confettis** : Library de confettis pour les LR/UR
4. **Pity Break Animation** : Animation spéciale quand on atteint le pity
5. **Multi-LR** : Animation encore plus spectaculaire si 2+ LR en une fois
6. **Skip Button** : Permettre de skip l'animation
7. **Animation selon rareté** : Couleur du flash change selon la meilleure carte obtenue
