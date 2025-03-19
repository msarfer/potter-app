import { cn } from "@/lib/utils";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth/AuthService";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await authService.signIn(email, password);
      console.log("Usuario autenticado:", userCredential.user);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl"><FormattedMessage id='navbar.link.signin'/></CardTitle>
          <CardDescription>
          <FormattedMessage id='app.login.msg'/>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
                <FormattedMessage id='navbar.link.signin'/>
              </Button>
              {error && <p className="error-message">{error}</p>}
            </div>
            <div className="mt-4 text-center text-sm">
              <FormattedMessage id='app.login.notAccount'/>{" "}
              <Link to="/signup" className="underline underline-offset-4">
                <FormattedMessage id='navbar.link.signup'/>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
