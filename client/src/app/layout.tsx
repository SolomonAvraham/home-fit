import "./globals.css";
import Providers from "@/QueryClientProvider";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header/header";
import Alert from "@/components/ui/alert/alert";
import Confirm from "@/components/ui/confirm/confirm";
import ScrollToTopButton from "@/components/ui/scrollToTopButton/scrollToTopButton";

export const metadata = {
  title: "Home Fit",
  description: "Home Fit App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/logo.png" type="image/png" sizes="50*50" />
      </head>
      <body className=" bg-gray-300  cursor-default">
        <Providers>
          {" "}
          <Header />
          <Alert />
          <Confirm />
          {children}
          <ScrollToTopButton />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
