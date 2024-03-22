import Script from "next/script";
import SideBar from "../../components/sidebar";
import Footer from "@/components/footer";

export default function Layout(
  {children} : { children: React.ReactNode}
) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideBar />
          </div>
          <div className="flex-grow h-screen p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}