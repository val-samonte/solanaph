import bs58 from 'bs58'
import { sign } from 'tweetnacl'
import { sql } from '@vercel/postgres'

export async function DELETE(request: Request) {
  const {
    message,
    signature,
    session_publickey,
  }: {
    message: string
    signature: string
    session_publickey: string
  } = await request.json()

  if (!message || !signature || !session_publickey) {
    return new Response('Bad Request', { status: 400 })
  }

  if (
    !sign.detached.verify(
      Buffer.from(message),
      bs58.decode(signature),
      bs58.decode(session_publickey)
    )
  ) {
    return new Response('Invalid Signature', { status: 400 })
  }

  try {
    await sql`
    DELETE FROM user_sessions
    WHERE session_publickey = ${session_publickey};
  `
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }

  return new Response('OK', { status: 200 })
}
