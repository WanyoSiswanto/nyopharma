import { setRequestLocale } from 'next-intl/server';

export default async function CenteredLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#f3faf6] via-[#f7faf8] to-[#edf7f2] px-4 py-8 sm:py-12">
      {props.children}
    </div>
  );
}
