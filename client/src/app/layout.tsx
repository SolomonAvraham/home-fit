import "./globals.css";
import Providers from "@/QueryClientProvider";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

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
      <body className=" bg-gray-300">
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
