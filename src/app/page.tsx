import Login from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | T&T',
    default: 'Ingresar | T&T',
  },
};

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <Login />
    </main>
  );
}
