import "./globals.css";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastProvider } from "./contexts/ToastContext";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.className} flex h-screen flex-col bg-contrast text-primary dark`}
      >
        <AuthProvider>
          <ToastProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
