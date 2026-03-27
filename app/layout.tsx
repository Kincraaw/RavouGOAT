import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RavouGOAT - Invocation de Personnages',
  description: 'Invoquez vos personnages préférés',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
