'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

// Types pour les personnages
interface Character {
  id: number
  name: string
  rarity: 'C' | 'R' | 'SR' | 'SSR' | 'UR' | 'LR'
  image: string
}

// Base de données des personnages
const characters: Character[] = [
  { id: 1, name: 'Ravoulhier', rarity: 'C', image: '/cards/Ravoulhier.png' },
  { id: 2, name: 'Ravoumage', rarity: 'C', image: '/cards/Ravoumage.png' },
  { id: 3, name: 'Ravoutir', rarity: 'R', image: '/cards/Ravoutir.png' },
  { id: 4, name: 'Ravousteak', rarity: 'R', image: '/cards/Ravousteak.png' },
  { id: 5, name: 'Le Rat', rarity: 'R', image: '/cards/Rat.jpeg' },
  { id: 6, name: 'Ravolie', rarity: 'SR', image: '/cards/Ravolie.png' },
  { id: 7, name: 'Ravourabre', rarity: 'SR', image: '/cards/Ravourabre.png' },
  { id: 8, name: 'Ravassassin', rarity: 'SSR', image: '/cards/Ravassassin.png' },
  { id: 9, name: 'Jewy', rarity: 'SSR', image: '/cards/Jewy.png' },
  { id: 10, name: 'Dragon Knight', rarity: 'UR', image: '/cards/dragon.png' },
  { id: 11, name: 'Ravoumaid', rarity: 'LR', image: '/cards/Ravoumaid.png' },
  { id: 12, name: 'Employé', rarity: 'R', image: '/cards/Mcdonald.jpeg' },
]

// Probabilités d'obtention par rareté (SÉVÈRE)
const rarityChances = {
  C: 0.70,     // 70%
  R: 0.20,     // 20%
  SR: 0.07,    // 7%
  SSR: 0.02,   // 2%
  UR: 0.008,   // 0.8%
  LR: 0.002    // 0.2%
}

interface HistoryEntry {
  _id: string
  userIp: string
  characters: Character[]
  pullCount: number
  timestamp: string
}

interface Stats {
  totalPulls: number
  totalSessions: number
  rarityCount: {
    C: number
    R: number
    SR: number
    SSR: number
    UR: number
    LR: number
  }
}

export default function Home() {
  const [pulledCharacters, setPulledCharacters] = useState<Character[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [showReveal, setShowReveal] = useState(false)
  const [totalPulls, setTotalPulls] = useState(0)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fonction pour tirer un personnage aléatoire basé sur les probabilités
  // Charger l'historique au montage du composant
  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const response = await fetch('/api/history/get')
      const data = await response.json()
      
      if (data.success) {
        setHistory(data.history)
        setStats(data.stats)
        setTotalPulls(data.stats.totalPulls)
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveToHistory = async (characters: Character[], pullCount: number) => {
    try {
      await fetch('/api/history/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characters, pullCount }),
      })
      // Recharger l'historique après sauvegarde
      loadHistory()
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const pullCharacter = (): Character => {
    const random = Math.random()
    let cumulativeProbability = 0
    let selectedRarity: Character['rarity'] = 'C'

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
    setShowReveal(false)
    setPulledCharacters([])
    const newCharacters: Character[] = []

    for (let i = 0; i < count; i++) {
      newCharacters.push(pullCharacter())
    }

    // Animation de révélation après 1.5 secondes
    setTimeout(() => {
      setShowReveal(true)
    }, 1500)

    // Afficher les cartes après 2.2 secondes
    setTimeout(() => {
      setPulledCharacters(newCharacters)
      setTotalPulls(prev => prev + count)
      saveToHistory(newCharacters, count)
      setIsAnimating(false)
      setShowReveal(false)
    }, 2200)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'LR': return '#ff0000'    // Rouge éclatant
      case 'UR': return '#fbbf24'    // Or
      case 'SSR': return '#a855f7'   // Violet
      case 'SR': return '#3b82f6'    // Bleu
      case 'R': return '#10b981'     // Vert
      case 'C': return '#9ca3af'     // Gris
      default: return '#9ca3af'
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'LR': return 'Legendary Rare'
      case 'UR': return 'Ultra Rare'
      case 'SSR': return 'Super Super Rare'
      case 'SR': return 'Super Rare'
      case 'R': return 'Rare'
      case 'C': return 'Common'
      default: return rarity
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
            <span className={styles.statLabel}>Sessions</span>
            <span className={styles.statValue}>{stats?.totalSessions || 0}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>� LR</span>
            <span className={styles.statValue}>{stats?.rarityCount.LR || 0}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>🟡 UR</span>
            <span className={styles.statValue}>{stats?.rarityCount.UR || 0}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>🟣 SSR</span>
            <span className={styles.statValue}>{stats?.rarityCount.SSR || 0}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>🔵 SR</span>
            <span className={styles.statValue}>{stats?.rarityCount.SR || 0}</span>
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
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingContent}>
              <div className={styles.summonCircle}>
                <div className={styles.innerCircle}></div>
                <div className={styles.outerCircle}></div>
              </div>
              <div className={styles.particles}>
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={styles.particle} style={{
                    '--angle': `${(360 / 20) * i}deg`,
                    '--delay': `${i * 0.05}s`
                  } as React.CSSProperties}></div>
                ))}
              </div>
              <h2 className={styles.summonText}>Invocation en cours...</h2>
              <div className={styles.energyBar}>
                <div className={styles.energyFill}></div>
              </div>
            </div>
            {showReveal && (
              <div className={styles.revealFlash}></div>
            )}
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
                      {character.rarity} - {getRarityLabel(character.rarity)}
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

        <div className={styles.historySection}>
          <button 
            className={styles.historyButton}
            onClick={() => setShowHistory(!showHistory)}
          >
            📜 {showHistory ? 'Masquer' : 'Afficher'} l'historique complet
          </button>

          {showHistory && (
            <div className={styles.historyContainer}>
              {isLoading ? (
                <p className={styles.historyLoading}>Chargement...</p>
              ) : history.length === 0 ? (
                <p className={styles.historyEmpty}>Aucun historique pour le moment. Commencez à invoquer !</p>
              ) : (
                <div className={styles.historyList}>
                  {history.map((entry) => (
                    <div key={entry._id} className={styles.historyItem}>
                      <div className={styles.historyHeader}>
                        <span className={styles.historyDate}>
                          {new Date(entry.timestamp).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span className={styles.historyCount}>
                          {entry.pullCount} invocation{entry.pullCount > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className={styles.historyCards}>
                        {entry.characters.map((char, idx) => (
                          <div 
                            key={`${entry._id}-${idx}`}
                            className={styles.historyCard}
                            style={{ borderColor: getRarityColor(char.rarity) }}
                          >
                            <img 
                              src={char.image} 
                              alt={char.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://via.placeholder.com/80x120/1e293b/ffffff?text=${char.name}`
                              }}
                            />
                            <span className={styles.historyCardName}>{char.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.probabilityInfo}>
          <h3>📊 Taux d'obtention</h3>
          <div className={styles.probabilityList}>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#9ca3af' }}>⚪ C - Common</span>
              <span>70%</span>
            </div>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#10b981' }}>🟢 R - Rare</span>
              <span>20%</span>
            </div>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#3b82f6' }}>🔵 SR - Super Rare</span>
              <span>7%</span>
            </div>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#a855f7' }}>🟣 SSR - Super Super Rare</span>
              <span>2%</span>
            </div>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#fbbf24' }}>🟡 UR - Ultra Rare</span>
              <span>0.8%</span>
            </div>
            <div className={styles.probabilityItem}>
              <span style={{ color: '#ff0000' }}>🔴 LR - Legendary Rare</span>
              <span>0.2%</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
