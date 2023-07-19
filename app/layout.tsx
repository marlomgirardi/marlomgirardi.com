import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans as Sans } from "next/font/google";

const sans = Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Marlom Girardi",
  description: "Creating awesome experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable}`}
      style={{
        colorScheme: "only dark",
      }}
    >
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex grow w-screen items-center justify-center">
            {children}
          </main>
          <footer className="flex justify-center gap-8 my-4 font-light">
            <a href="https://github.com/marlomgirardi">Github</a>
            <a href="https://www.linkedin.com/in/marlomgirardi/?locale=en_US">
              Linkedin
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
