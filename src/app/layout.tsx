import type { Metadata } from "next";
import "./style.css";

export const metadata: Metadata = {
  title: "My react-hook-form",
  description: "react-hook-formのサンプルです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="wrapper">
          <h1 className="title">my react-hook-form</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
