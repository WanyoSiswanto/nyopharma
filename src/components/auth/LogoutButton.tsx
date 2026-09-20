'use client';

import { IconDoorExit } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { clearAdminSessionCookie } from '@/utils/AuthActions';

type LogoutButtonProps = {
  locale: string;
  label: string;
  className?: string;
  redirectTo?: string;
};

/**
 * Universal Logout Button that terminates active session cookies and clears local cache.
 *
 * @param props Component properties with locale and custom styling options.
 * @returns JSX button element that executes user sign-out.
 */
export function LogoutButton(props: LogoutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await clearAdminSessionCookie();
    try {
      localStorage.removeItem('nyo_admin_user');
      localStorage.removeItem('nyo_customer_user');
      localStorage.removeItem('nyo_active_role');
    } catch {
      // Ignore storage errors in private browsing
    }
    const targetUrl = props.redirectTo ?? `/${props.locale}/sign-in?logged_out=1`;
    router.push(targetUrl);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={() => {
        void handleSignOut();
      }}
      className={
        props.className ??
        'inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:border-rose-200 hover:bg-rose-50/70 hover:text-rose-700 active:scale-95'
      }
    >
      <IconDoorExit className="size-3.5 text-rose-500" stroke={2} />
      <span>{props.label}</span>
    </button>
  );
}
