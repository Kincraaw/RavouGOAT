import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getClientIp } from '@/lib/getClientIp'

export async function GET(request: NextRequest) {
  try {
    // Obtenir l'IP du client
    const userIp = getClientIp(request)

    // Connexion à MongoDB
    const client = await clientPromise
    const db = client.db('it8_card')
    const collection = db.collection('historique')

    // Récupérer l'historique de cet utilisateur (par IP)
    // Trier par date décroissante et limiter à 50 entrées
    const history = await collection
      .find({ userIp })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray()

    // Calculer des statistiques
    const totalPulls = history.reduce((sum, entry) => sum + entry.pullCount, 0)
    
    const rarityCount = {
      C: 0,
      R: 0,
      SR: 0,
      SSR: 0,
      UR: 0,
      LR: 0,
    }

    history.forEach((entry) => {
      entry.characters.forEach((char: any) => {
        if (char.rarity in rarityCount) {
          rarityCount[char.rarity as keyof typeof rarityCount]++
        }
      })
    })

    return NextResponse.json({
      success: true,
      userIp,
      history,
      stats: {
        totalPulls,
        totalSessions: history.length,
        rarityCount,
      },
    })
  } catch (error) {
    console.error('Erreur lors de la récupération:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
