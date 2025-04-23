import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth/AuthService";
import { Rol } from "@/services/auth/AuthServiceInterface";
import { firebaseDatabaseService } from "@/services/auth/firebase/FirebaseDatabaseService";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await authService.signUp(email, password);
      await firebaseDatabaseService.setUserRoles(userCredential.user.uid, {
        email: userCredential.user.email,
        roles: [Rol.USER],
      });
      await firebaseDatabaseService.restoreUserAppData(userCredential.user.uid);
      setSuccess("Registro exitoso. Redirigiendo a los libros...");
      setTimeout(() => {
        navigate("/books");
      }, 2000);
    } catch (error: any) {
      console.error("Error al registrarse:", error);
      setError(error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <FormattedMessage id="navbar.link.signup" />
          </CardTitle>
          <CardDescription>
            <FormattedMessage id="app.signup.msg" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <FormattedMessage id="navbar.link.signup" />
              </Button>
              {error && <p className="text-red-400">{error}</p>}
              {success && <p className="text-green-700">{success}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
