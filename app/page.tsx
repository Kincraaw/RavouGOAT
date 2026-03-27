'use client'

import { useState } from 'react'
import styles from './page.module.css'

// Types pour les personnages
interface Character {
  id: number
  name: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  image: string
}

// Base de données des personnages
const characters: Character[] = [
  { id: 1, name: 'Guerrier', rarity: 'common', image: '/cards/warrior.png' },
  { id: 2, name: 'Mage', rarity: 'common', image: '/cards/mage.png' },
  { id: 3, name: 'Archer', rarity: 'rare', image: '/cards/archer.png' },
  { id: 4, name: 'Paladin', rarity: 'rare', image: '/cards/paladin.png' },
  { id: 5, name: 'Assassin', rarity: 'epic', image: '/cards/assassin.png' },
  { id: 6, name: 'Druide', rarity: 'epic', image: '/cards/druid.png' },
  { id: 7, name: 'Dragon Knight', rarity: 'legendary', image: '/cards/dragon.png' },
  { id: 8, name: 'Phoenix', rarity: 'legendary', image: '/cards/phoenix.png' },
]

// Probabilités d'obtention par rareté
const rarityChances = {
  common: 0.60,    // 60%
  rare: 0.30,      // 30%
  epic: 0.09,      // 9%
  legendary: 0.01  // 1%
}

export default function Home() {
  const [pulledCharacters, setPulledCharacters] = useState<Character[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [totalPulls, setTotalPulls] = useState(0)

  // Fonction pour tirer un personnage aléatoire basé sur les probabilités
  const pullCharacter = (): Character => {
    const random = Math.random()
    let cumulativeProbability = 0
    let selectedRarity: Character['rarity'] = 'common'

    for (const [rarity, chance] of Object.entries(rarityChances)) {
      cumulativeProbability += chance
      if (random <= cumulativeProbability) {
        selectedRarity = rarity as Character['rarity']
        break
      }
    }

    const availableCharacters = characters.filter(c => c.rarity === selectedRarity)
    return availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
  }

  // Fonction pour invoquer des personnages
  const handlePull = (count: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    const newCharacters: Character[] = []

    for (let i = 0; i < count; i++) {
      newCharacters.push(pullCharacter())
    }

    setPulledCharacters(newCharacters)
    setTotalPulls(prev => prev + count)

    // Animation terminée après 2 secondes
    setTimeout(() => {
      setIsAnimating(false)
    }, 2000)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#fbbf24'
      case 'epic': return '#a855f7'
      case 'rare': return '#3b82f6'
      default: return '#9ca3af'
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          ⚔️ RavouGOAT
        </h1>
        <p className={styles.subtitle}>Invoquez vos personnages légendaires</p>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Invocations</span>
            <span className={styles.statValue}>{totalPulls}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Dernière Session</span>
            <span className={styles.statValue}>{pulledCharacters.length}</span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.pullButton}
            onClick={() => handlePull(1)}
            disabled={isAnimating}
          >
            <span className={styles.buttonIcon}>✨</span>
            <span className={styles.buttonText}>Invoquer x1</span>
            <span className={styles.buttonCost}>100 💎</span>
          </button>

          <button 
            className={`${styles.pullButton} ${styles.pullButton10}`}
            onClick={() => handlePull(10)}
            disabled={isAnimating}
          >
            <span className={styles.buttonIcon}>🌟</span>
            <span className={styles.buttonText}>Invoquer x10</span>
            <span className={styles.buttonCost}>900 💎</span>
          </button>
        </div>

        {isAnimating && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Invocation en cours...</p>
          </div>
        )}

        {pulledCharacters.length > 0 && !isAnimating && (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>Résultats de l'invocation</h2>
            <div className={styles.cardsGrid}>
              {pulledCharacters.map((character, index) => (
                <div 
                  key={`${character.id}-${index}`} 
                  className={styles.card}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    borderColor: getRarityColor(character.rarity)
                  }}
                >
                  <div className={styles.cardImage}>
                    <img 
                      src={character.image} 
                      alt={character.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x300/1e293b/ffffff?text=${character.name}`
                      }}
                    />
                  </div>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardName}>{character.name}</h3>
                    <span 
                      className={styles.cardRarity}
                      style={{ color: getRarityColor(character.rarity) }}
                    >
                      {character.rarity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className={styles.clearButton}
              onClick={() => setPulledCharacters([])}
            >
              Effacer les résultats
            </button>
          </div>
        )}

        <div className={styles.probabilityInfo}>
          <h3>📊 Taux d'obtention</h3>
          <div className={styles.probabilityList}>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#9ca3af' }}>⚪ Commun</span>
              <span>60%</span>
            </div>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#3b82f6' }}>🔵 Rare</span>
              <span>30%</span>
            </div>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#a855f7' }}>🟣 Épique</span>
              <span>9%</span>
            </div>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#fbbf24' }}>🟡 Légendaire</span>
              <span>1%</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
