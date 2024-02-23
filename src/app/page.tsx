import dotenv from "dotenv";
import Login from "@/components/login";

dotenv.config();

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <Login />
    </main>
  );
}
