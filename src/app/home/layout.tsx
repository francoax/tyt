import Script from "next/script";
import SideBar from "../../components/sidebar";
import Footer from "@/components/footer";

export default function Layout(
  {children} : { children: React.ReactNode}
) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideBar />
        </div>
        <div className="flex flex-col justify-between flex-grow h-screen md:overflow-y-auto">
          <div className="p-6 md:p-12">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}