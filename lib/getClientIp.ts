import { NextRequest } from 'next/server'

export function getClientIp(request: NextRequest): string {
  // Essayer différents headers pour obtenir la vraie IP du client
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwarded) {
    // x-forwarded-for peut contenir plusieurs IPs, prendre la première
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp.trim()
  }
  
  // Fallback sur l'IP de connexion (pour développement local)
  return request.ip || 'unknown'
}
