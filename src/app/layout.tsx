"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import store, { persistor } from "../app/reduxStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <html lang="en" className="h-full">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-azulJuztina`}
          >
            {children}
          </body>
        </html>
      </PersistGate>
    </Provider>
  );
}
