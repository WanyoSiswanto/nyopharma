'use server';

import { cookies } from 'next/headers';

/**
 * Set authentication session cookie for demo admin portal access.
 * @param rememberMe - Flag to extend session validity
 */
export async function setAdminSessionCookie(rememberMe: boolean) {
  const cookieStore = await cookies();
  const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24;

  cookieStore.set('nyo_admin_session', 'authenticated', {
    path: '/',
    maxAge,
    sameSite: 'lax',
    httpOnly: false,
  });
}

/**
 * Clear authentication session cookie on logout.
 */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('nyo_admin_session');
}
