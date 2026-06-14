import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 px-6 md:px-8 py-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
