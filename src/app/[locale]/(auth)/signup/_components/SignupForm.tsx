"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { SocialLoginButton } from "@/components/auth/SocialLoginButton";
import { useTranslations } from "next-intl";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth.signup");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError("");

    if (data.password !== data.confirmPassword) {
      setError(t("passwordsDontMatch"));
      setLoading(false);
      return;
    }

    console.log("Signup data:", data);
    setTimeout(() => {
      setLoading(false);
      // router.push("/admin");
    }, 2000);
  };

  const handleGoogleSignup = () => {
    console.log("Google signup");
  };

  const handleFacebookSignup = () => {
    console.log("Facebook signup");
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in-0 zoom-in-95 duration-500">
      <Card className="overflow-hidden border-0 shadow-2xl">
        <div className="relative bg-gradient-to-br from-primary via-primary to-main h-2">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>

        <CardHeader className="space-y-3 bg-gradient-to-br from-gray-50 to-white pb-6 pt-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-2">
              <User className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-center text-gray-900 font-arabic">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 font-arabic">
              {t("subtitle")}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-8">
          {error && (
            <Alert
              variant="destructive"
              className="animate-in slide-in-from-top-5 duration-300"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-arabic">
                {t("name")}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  {...register("name", {
                    required: t("nameRequired"),
                    minLength: {
                      value: 3,
                      message: t("nameMinLength"),
                    },
                  })}
                  type="text"
                  placeholder={t("namePlaceholder")}
                  className={`pl-10 ${
                    errors.name ? "border-red-500" : ""
                  } transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 animate-in slide-in-from-top-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-arabic">
                {t("email")}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  dir="ltr"
                  {...register("email", {
                    required: t("emailRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("emailInvalid"),
                    },
                  })}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className={`pl-10 ${
                    errors.email ? "border-red-500" : ""
                  } transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 animate-in slide-in-from-top-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-arabic">
                {t("password")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  dir="ltr"
                  {...register("password", {
                    required: t("passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("passwordMinLength"),
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
                  className={`pl-10 pr-10 ${
                    errors.password ? "border-red-500" : ""
                  } transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 animate-in slide-in-from-top-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 font-arabic"
              >
                {t("confirmPassword")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  dir="ltr"
                  {...register("confirmPassword", {
                    required: t("confirmPasswordRequired"),
                    validate: (value) =>
                      value === password || t("passwordsDontMatch"),
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
                  className={`pl-10 pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  } transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "إخفاء كلمة المرور"
                      : "إظهار كلمة المرور"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 animate-in slide-in-from-top-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] font-arabic"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("creatingAccount")}
                </>
              ) : (
                t("signupButton")
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500 font-arabic">
                {t("or")}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <SocialLoginButton
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
              label={t("signUpWithGoogle")}
              onClick={handleGoogleSignup}
              bgColor="bg-[#4285F4]"
            />
            <SocialLoginButton
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              }
              label={t("signUpWithFacebook")}
              onClick={handleFacebookSignup}
              bgColor="bg-[#1877F2]"
            />
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-arabic">
              {t("hasAccount")}{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200 hover:underline"
              >
                {t("signIn")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
