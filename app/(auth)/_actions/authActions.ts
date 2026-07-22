"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export type loginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};
export const loginAction = async (
  prevState: loginState,
  formData: FormData,
) => {
  console.log(prevState);
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: loginState = await res.json();

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    const decoded = jwt.decode(result.data.accessToken) as JwtPayload;
    if (decoded.role === "USER") {
      redirect("/dashboard");
    }
    if (decoded.role === "ADMIN") {
      redirect("/admin-dashboard");
    }
    if (decoded.role === "AUTHOR") {
      redirect("/author-dashboard");
    }
  }

  return result;
};
