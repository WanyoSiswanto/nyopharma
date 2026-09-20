import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CustomerPortalView } from '@/components/customer/CustomerPortalView';

type CustomerOrdersPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: CustomerOrdersPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return {
    title: 'Akun Pelanggan & Riwayat Pesanan - Apotek Nyopharma',
    description:
      'Pantau riwayat pembelian obat, lacak pengiriman kurir bersegel CDOB, resep digital, dan pengingat refill obat rutin.',
  };
}

export default async function CustomerOrdersPage(props: CustomerOrdersPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <CustomerPortalView />;
}
