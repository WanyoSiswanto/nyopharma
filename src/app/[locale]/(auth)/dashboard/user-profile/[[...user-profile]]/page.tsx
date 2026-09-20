import { setRequestLocale } from 'next-intl/server';
import { UserProfileCard } from '@/components/dashboard/UserProfileCard';

export default async function UserProfilePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="py-6">
      <UserProfileCard locale={locale} />
    </div>
  );
}
