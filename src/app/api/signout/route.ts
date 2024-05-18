import { cookies } from 'next/headers'

export async function GET() {
  cookies().delete('session')

  return new Response('OK', {
    status: 200,
  })
}
