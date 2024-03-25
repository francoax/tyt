import LoginForm from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | T&T',
    default: 'Ingresar | T&T',
  },
};

export default function Home() {
  return (
    <main className="flex items-center justify-center h-svh md:min-h-screen">
      <LoginForm />
    </main>
  );
}
