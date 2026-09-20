import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CustomerPortalView } from '@/components/customer/CustomerPortalView';

type CustomerPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: CustomerPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return {
    title: 'Akun Pelanggan & Riwayat Pesanan - Apotek Nyopharma',
    description:
      'Portal akun pelanggan, riwayat pembelian, lacak pengiriman kurir CDOB, dan resep digital.',
  };
}

export default async function CustomerPage(props: CustomerPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <CustomerPortalView />;
}
