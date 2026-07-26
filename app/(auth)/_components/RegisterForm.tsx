"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction, type registerState } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

const initialState: registerState = {
  success: false,
  statusCode: 0,
  message: "",
};

const RegisterForm = () => {
  const [state, action, pending] = useActionState(
    registerAction,
    initialState,
  );

  useEffect(() => {
    if (!state) return;
    if (state.statusCode === 0) return;
    if (state.success) {
      toast.success(state.message || "Account created! Redirecting to login...");
      return;
    }
    toast.error(state.message || "Registration failed!");
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="space-y-4 p-5">
        <Input
          name="name"
          placeholder="Enter your Name"
          required
        />
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
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account..." : "Register"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </form>
  );
};

export default RegisterForm;
