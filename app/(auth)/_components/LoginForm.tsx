"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction, type loginState } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState: loginState = {
  success: false,
  statusCode: 0,
  message: "",
  data: {
    accessToken: "",
    refreshToken: "",
  },
};

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, initialState);
  const router = useRouter();
  useEffect(() => {
    if (!state) return;
    // Don't show toasts on initial mount. `statusCode === 0` means no response yet.
    if (state.statusCode === 0) return;
    if (state.success) {
      toast.success(state.message || "Logged in successfully!");
      router.push("/dashboard");
      return;
    }
    toast.error(state.message || "Login failed!");
  }, [state, router]);
  return (
    <form action={action} className="space-y-4 ">
      <Card className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Enter your Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your Password"
          required
        />
        <Button type="submit">{pending ? "Submitting..." : "Login"}</Button>
      </Card>
    </form>
  );
};
export default LoginForm;
