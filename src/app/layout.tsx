import type { Metadata } from "next";
import "./style.css";

export const metadata: Metadata = {
  title: "My react hook form",
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
          <h2 className="title">my react hook form</h2>
          {children}
        </div>
      </body>
    </html>
  );
}
