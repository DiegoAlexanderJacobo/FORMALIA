import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import AiAssistantDrawer from "@/components/AiAssistantDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "FORMALIA - Cuaderno de Control Inteligente",
  description: "FORMALIA es la capa estratégica de formalización y control tributario de los emprendedores peruanos en el Nuevo RUS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen pb-24 md:pb-0">
        <AppProvider>
          <Navbar />
          {children}
          <BottomNav />
          <AiAssistantDrawer />
        </AppProvider>
      </body>
    </html>
  );
}
