import { setRequestLocale } from 'next-intl/server';
import { PharmacyDashboard } from '@/components/dashboard/PharmacyDashboard';

export default async function DashboardPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="py-6">
      <PharmacyDashboard locale={locale} />
    </div>
  );
}
