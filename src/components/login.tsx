import { ButtonPrimary } from "./buttons";
import { Input } from "./inputs";

export default function Login() {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="px-6 py-4">
        {/* <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
        </div> */}
        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">T&T</h3>
        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login</p>
        <form>
          <div className="w-full mt-4">
            <Input type="text" placeholder="Username" />
          </div>
          <div className="w-full mt-4">
            <Input type="password" placeholder="*********" />
          </div>
          <div className="flex justify-center mt-4">
            <ButtonPrimary content="Ingresar" type="button" />
          </div>
        </form>
    </div>
</div>
  )
}