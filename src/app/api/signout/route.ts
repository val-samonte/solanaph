import { cookies } from 'next/headers'

export async function GET() {
  cookies().delete('session')

  // cookies().set('session', '', {
  //   httpOnly: true,
  //   secure: true,
  //   expires: new Date(0),
  //   sameSite: 'strict',
  //   path: '/',
  // })

  return new Response('OK', {
    status: 200,
  })
}
