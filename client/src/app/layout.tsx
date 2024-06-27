import Providers from "./providers";

export const metadata = {
  title: 'HomeWorkout' ,
  description: 'HomeWorkout App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
