import bs58 from 'bs58'
import { sign } from 'tweetnacl'
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
  const {
    message,
    signature,
    owner_publickey,
  }: {
    message: string
    signature: string
    owner_publickey: string
  } = await request.json()

  if (!message || !signature || !owner_publickey) {
    return new Response('Bad Request', { status: 400 })
  }

  if (
    !sign.detached.verify(
      Buffer.from(message),
      bs58.decode(signature),
      bs58.decode(owner_publickey)
    )
  ) {
    return new Response('Invalid Signature', { status: 400 })
  }

  const params = message.split(' ').reverse()
  const timestamp = params[0]
  const session_publickey = params[1]

  if (Math.abs(new Date().getTime() - parseInt(timestamp, 16)) > 300000) {
    return new Response('Invalid Timestamp', { status: 400 })
  }

  try {
    await sql`
    INSERT INTO user_sessions (owner_publickey, session_publickey)
    VALUES (${owner_publickey}, ${session_publickey})
    ON CONFLICT (owner_publickey) 
    DO UPDATE SET
      session_publickey = EXCLUDED.session_publickey;
  `
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }

  try {
    await sql`
    INSERT INTO participants (owner_publickey, created_at)
    VALUES (${owner_publickey}, NOW())
    ON CONFLICT (owner_publickey) DO NOTHING;
    `
  } catch (e) {}

  return new Response('OK', { status: 200 })
}
