import { useState } from "react";
import api from "../utils/api";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface AuthPageProps {
  onLogin: (userData: any) => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN (note updated path)
        const res = await api.post("/api/auth/login", {
          email: form.email,
          password: form.password,
          role,
        });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        onLogin(user);
        window.location.reload(); // reload ensures dashboard renders immediately
      } else {
        // REGISTER (note updated path)
        const res = await api.post("/api/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          role,
        });

        alert("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Solar Installation System</CardTitle>
          <CardDescription>
            {isLogin ? "Login to your account" : "Register a new account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* ✅ Corrected Tabs Structure */}
          <Tabs
            defaultValue={isLogin ? "login" : "register"}
            onValueChange={(v: string) => setIsLogin(v === "login")}
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* LOGIN FORM */}
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label>Role</Label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="customer">Customer</option>
                    <option value="installer">Installer</option>
                    <option value="officer">CEB Officer</option>
                  </select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* REGISTER FORM */}
            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="customer">Customer</option>
                    <option value="installer">Installer</option>
                  </select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
