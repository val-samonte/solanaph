import bs58 from 'bs58'
import { cookies } from 'next/headers'
import { sign } from 'tweetnacl'
import { encrypt } from '@/utils/encrypt'

export async function POST(request: Request) {
  try {
    const { publicKey, message, signature } = await request.json()

    if (!publicKey || !message || !signature) {
      return new Response('Bad Request', { status: 400 })
    }

    if (
      !sign.detached.verify(
        Buffer.from(message),
        bs58.decode(signature),
        bs58.decode(publicKey)
      )
    ) {
      return new Response('Invalid signature', { status: 401 })
    }

    const [timestampInHex] = message.split(' ').reverse()
    const now = Date.now()
    const timestamp = parseInt(timestampInHex, 16)

    if (timestamp < now - 300000 || timestamp > now + 300000) {
      return new Response('Invalid timestamp', { status: 401 })
    }

    const expiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000)
    const refreshToken = `${publicKey}.${expiresAt.getTime()}`

    const session = encrypt(refreshToken)

    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'strict',
      path: '/',
    })

    return new Response('OK', {
      status: 200,
    })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
