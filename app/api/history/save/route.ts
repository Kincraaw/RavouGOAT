import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getClientIp } from '@/lib/getClientIp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { characters, pullCount } = body

    if (!characters || !pullCount) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Obtenir l'IP du client
    const userIp = getClientIp(request)

    // Connexion à MongoDB
    const client = await clientPromise
    const db = client.db('it8_card')
    const collection = db.collection('historique')

    // Créer l'entrée d'historique
    const historyEntry = {
      userIp,
      characters,
      pullCount,
      timestamp: new Date(),
    }

    // Insérer dans la base de données
    const result = await collection.insertOne(historyEntry)

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      userIp,
    })
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
