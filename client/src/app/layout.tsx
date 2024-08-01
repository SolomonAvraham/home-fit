import "./globals.css";
import Providers from "@/QueryClientProvider";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header/header";

export const metadata = {
  title: "HomeWorkout",
  description: "HomeWorkout App",
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
      <body className=" bg-gray-300  ">
        <Providers>
          {" "}
          <Header />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
