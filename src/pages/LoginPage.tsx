import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex w-full items-start justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
