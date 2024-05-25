import { sql } from '@vercel/postgres'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { rowCount, rows } =
      await sql`SELECT session_publickey from user_sessions where owner_publickey=${params.id} ORDER BY updated_at DESC LIMIT 1;`

    if (rowCount === 0) {
      return new Response('null', { status: 200 })
    }

    return new Response(rows[0].session_publickey, { status: 200 })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
