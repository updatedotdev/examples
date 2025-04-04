import { Spinner } from "@/components/ui/spinner";
import { updateClient } from "@/utils/update";
import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSWRConfig } from "swr";

export default function CallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate } = useSWRConfig();

  const deleteSearchParams = useCallback(() => {
    searchParams.forEach((_, key) => {
      searchParams.delete(key);
    });
  }, [searchParams]);

  useEffect(() => {
    const code = searchParams.get("code");
    async function handleCallback() {
      if (code == null) return;
      const { error } = await updateClient.auth.verifyAuthFlowCode(code);
      if (error) {
        return;
      }
      deleteSearchParams();
      await mutate("user");
      navigate("/protected");
    }
    handleCallback();
  }, [navigate, searchParams, mutate, deleteSearchParams]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center justify-center gap-4 mt-16">
        <Spinner />
        <div>Redirecting you to the home page...</div>
      </div>
    </div>
  );
}
