# Guide du Système d'Historique

## 🎯 Vue d'ensemble

Le système d'historique permet de sauvegarder automatiquement toutes les invocations de personnages dans MongoDB, identifiant chaque utilisateur par son adresse IP.

## 🔄 Fonctionnement

### 1. Identification de l'utilisateur

L'application utilise l'adresse IP pour identifier chaque utilisateur de manière unique :

```typescript
// Extraction de l'IP depuis les headers HTTP
const userIp = getClientIp(request)
```

**Headers utilisés (par ordre de priorité) :**
1. `x-forwarded-for` - Utilisé par les proxies et load balancers
2. `x-real-ip` - IP réelle du client
3. `request.ip` - IP de connexion directe (développement local)

### 2. Sauvegarde automatique

Chaque fois que vous cliquez sur "Invoquer x1" ou "Invoquer x10", l'application :
1. ✅ Génère les personnages aléatoires
2. ✅ Affiche les résultats avec animation
3. ✅ Sauvegarde automatiquement dans MongoDB
4. ✅ Recharge les statistiques globales

### 3. Affichage de l'historique

Cliquez sur le bouton "📜 Afficher l'historique complet" pour voir :
- 📅 Date et heure de chaque session
- 🎴 Toutes les cartes obtenues lors de chaque invocation
- 📊 Statistiques globales :
  - Total d'invocations
  - Nombre de sessions
  - Nombre de cartes par rareté (Commun, Rare, Épique, Légendaire)

## 📊 Statistiques en temps réel

Les 4 cartes de statistiques en haut de la page affichent :
1. **Total Invocations** - Nombre total de personnages invoqués
2. **Sessions** - Nombre de fois où vous avez cliqué sur x1 ou x10
3. **🟡 Légendaires** - Nombre de légendaires obtenus (1% de chance)
4. **🟣 Épiques** - Nombre d'épiques obtenus (9% de chance)

## 🔐 Avantages et Limites de l'identification par IP

### ✅ Avantages
- **Pas de connexion requise** - Accès instantané
- **Persistance** - Historique conservé entre les sessions
- **Simplicité** - Aucune inscription nécessaire
- **Vie privée** - Pas de données personnelles stockées

### ⚠️ Limites à connaître
- **Réseaux partagés** - Plusieurs utilisateurs sur le même réseau (école, entreprise, famille) partageront le même historique
- **IP dynamique** - Certains FAI changent votre IP régulièrement, ce qui créera un nouvel historique
- **VPN/Proxy** - Changer de VPN = nouvel historique
- **Développement local** - En local, l'IP sera "unknown" ou "::1" (localhost)

## 🗄️ Structure des données MongoDB

### Collection : `historique`
```json
{
  "_id": "ObjectId()",
  "userIp": "192.168.1.100",
  "characters": [
    {
      "id": 7,
      "name": "Dragon Knight",
      "rarity": "legendary",
      "image": "/cards/dragon.png"
    }
  ],
  "pullCount": 10,
  "timestamp": "2026-03-27T10:30:00.000Z"
}
```

### Indexes recommandés
Pour optimiser les performances, créez ces index dans MongoDB :
```javascript
db.historique.createIndex({ userIp: 1, timestamp: -1 })
db.historique.createIndex({ timestamp: -1 })
```

## 🚀 API Endpoints

### GET `/api/history/get`
Récupère l'historique de l'utilisateur actuel (basé sur l'IP)

**Réponse :**
```json
{
  "success": true,
  "userIp": "192.168.1.100",
  "history": [...],
  "stats": {
    "totalPulls": 150,
    "totalSessions": 25,
    "rarityCount": {
      "common": 90,
      "rare": 45,
      "epic": 13,
      "legendary": 2
    }
  }
}
```

### POST `/api/history/save`
Sauvegarde une nouvelle invocation

**Corps de la requête :**
```json
{
  "characters": [...],
  "pullCount": 10
}
```

**Réponse :**
```json
{
  "success": true,
  "id": "ObjectId()",
  "userIp": "192.168.1.100"
}
```

## 🔧 Développement et Tests

### Variables d'environnement (.env.local)
```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/it8_card
```

### Tester localement
1. Assurez-vous que MongoDB est connecté
2. Lancez `npm run dev`
3. Ouvrez http://localhost:3001
4. Invoquez des personnages
5. Vérifiez la console pour les éventuelles erreurs

### Debug MongoDB
Pour vérifier les données directement dans MongoDB :
```javascript
// MongoDB Compass ou Shell
use it8_card
db.historique.find().sort({ timestamp: -1 }).limit(10)
```

## 💡 Améliorations futures possibles

1. **Session ID** - Utiliser des cookies pour identifier de manière plus fiable
2. **Authentification optionnelle** - Permettre la connexion pour un historique permanent
3. **Export de données** - Télécharger son historique en JSON/CSV
4. **Partage** - Partager ses meilleures invocations
5. **Classement** - Leaderboard des joueurs les plus chanceux
6. **Filtres** - Filtrer l'historique par rareté, date, etc.
