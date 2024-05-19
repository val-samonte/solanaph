import bs58 from 'bs58'
import { sign } from 'tweetnacl'
import { sql } from '@vercel/postgres'

// fe fetches the public key of the wallet from the database to know if the user already registered (user/[id]/registered)

// user inputs password
// - if session keypair is not stored in the local storage, proceed to the next step, else decrypt the keypair with the password, end

// user signs a message which includes the hash of the password

// fe generates keypair based on password + part of the signature result, named it session keypair

// fe submits this message together with the public key of the wallet,
// the public key of the session and the signature to the server

// after verification:

// if user does not have an entry to the database, store the session public key, the wallet public key, and the hash of the password
// return a success message to fe

// if user exist, verify if the hash from the message is the same as the hash stored in the database
// if yes, do nothing and return success to fe
// if no, send an error to the user that the password is incorrect

// if fe receives success, proceed storing the keypair to the local storage encrypted with the password

export async function POST(request: Request) {
  const {
    message,
    signature,
    owner_publickey,
    session_publickey,
  }: {
    message: string
    signature: string
    owner_publickey: string
    session_publickey: string
  } = await request.json()

  if (!message || !signature || !owner_publickey || !session_publickey) {
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

  const password_hash = message.split(' ').reverse()[0]

  try {
    const { rowCount, rows } =
      await sql`SELECT password_hash, owner_publickey from user_sessions where owner_publickey=${owner_publickey} WHERE soft_deleted_at = NULL ORDER BY created_at DESC LIMIT 1`

    if (rowCount === 0) {
      await sql`INSERT INTO user_sessions (owner_publickey, session_publickey, password_hash) VALUES (${owner_publickey}, ${session_publickey}, ${password_hash})`
      return new Response('OK', { status: 200 })
    }

    if (rows[0].password_hash !== password_hash) {
      return new Response('Incorrect Password', { status: 400 })
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
