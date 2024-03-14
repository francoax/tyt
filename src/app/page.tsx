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
    <main className="min-h-[95svh] flex justify-center items-center">
      <LoginForm />
    </main>
  );
}
