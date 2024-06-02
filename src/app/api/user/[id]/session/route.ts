import { sql } from '@vercel/postgres'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const headers = {
  'Access-Control-Allow-Origin': '*', // todo: restrict to only the partykit origin (localhost, solanaph-party.val-samonte.partykit.dev)
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { rowCount, rows } =
      await sql`SELECT session_publickey from user_sessions where owner_publickey=${params.id} ORDER BY updated_at DESC LIMIT 1;`

    if (rowCount === 0) {
      return new Response('null', { status: 200, headers })
    }

    return new Response(rows[0].session_publickey, { status: 200, headers })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500, headers })
  }
}
