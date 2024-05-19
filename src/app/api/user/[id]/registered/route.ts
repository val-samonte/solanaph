import { sql } from '@vercel/postgres'

export const fetchCache = 'force-no-store'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { rowCount } =
      await sql`SELECT owner_publickey from user_sessions where owner_publickey=${params.id}`

    if (rowCount === 0) {
      return new Response('false', { status: 200 })
    }

    return new Response('true', { status: 200 })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
