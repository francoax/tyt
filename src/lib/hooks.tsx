import { useFormState } from "react-dom";
import { ServerActionResponse } from "./definitions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Alert from "@/components/alerts";
import { SUCCESS_STATUS } from "./constants";

export default function useFormHandler(
  toastTitle: string, returnOnSuccess: string, serverAction: any, initialState: ServerActionResponse = { message: '', status: '', errors: {}}
): [state: ServerActionResponse, formAction: () => void]  {
  const [state, formAction] = useFormState(serverAction, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.status && state.message) {
      toast(() => (
        <Alert title={toastTitle} reason={state.status} description={state.message} />
      ));
    }

    if (state.status === SUCCESS_STATUS) {
      router.push(returnOnSuccess);
    }
  }, [state, router, toastTitle, returnOnSuccess]);

  return [state, formAction];
}