import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [loading,setLoading]=useState(false);
  const fill=(e)=>{
   const input={email:"user1@gmail.com",password:"123"}
    auth.loginAction(input);
  }
  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log(input);
    setLoading(true)
    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    setLoading(false)
    alert("please provide a valid input");
  };

  const handleInput = (e,field) => {
    const {  value } = e.target;
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        {loading &&  <svg
                  id="svg"
                  fill="#000000"
                  stroke="#000000"
                  width="25px"
                  height="25px"
                  version="1.1"
                  viewBox="144 144 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="IconSvg_bgCarrier" stroke-width="0"></g>
                  <g
                    id="IconSvg_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                  ></g>
                  <g id="IconSvg_iconCarrier">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path d="m457.43 387.4h-143.59c-2.5195 0-4.5352 2.0156-4.5352 4.5352s2.0156 4.5352 4.5352 4.5352h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352s-2.0156-4.5352-4.5352-4.5352z" />
                      <path d="m313.85 432.24h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352s-2.0156-4.5352-4.5352-4.5352h-143.59c-2.5195 0-4.5352 2.0156-4.5352 4.5352s2.0156 4.5352 4.5352 4.5352z" />
                      <path d="m457.43 457.94h-143.08c-2.5195 0-4.5352 2.0156-4.5352 4.5352 0 2.5195 2.0156 4.5352 4.5352 4.5352h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352 0-2.5195-2.0156-4.5352-5.0391-4.5352z" />
                      <path d="m457.43 493.2h-143.08c-2.5195 0-4.5352 2.0156-4.5352 4.5352s2.0156 4.5352 4.5352 4.5352h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352s-2.0156-4.5352-5.0391-4.5352z" />
                      <path d="m457.43 528.47h-143.59c-2.5195 0-4.5352 2.0156-4.5352 4.5352 0 2.5195 2.0156 4.5352 4.5352 4.5352h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352 0-2.5195-2.0156-4.5352-4.5352-4.5352z" />
                      <path d="m537.04 292.18c0-41.312-33.754-75.066-75.066-75.066-29.727 0-54.914 17.129-67.512 41.816h-39.297c-1.0078 0-2.5195 0.50391-3.5273 1.5117l-82.121 82.117c-1.0078 1.0078-1.5117 2.0156-1.5117 3.5273v236.79h234.77l0.003906-227.72c20.656-13.605 34.258-36.777 34.258-62.977zm-186.41-17.129v66h-66zm142.58 297.75h-215.12v-222.18h77.586c2.5195 0 4.5352-2.0156 4.5352-4.5352v-78.09h30.73c-2.5195 7.5586-4.0312 15.617-4.0312 23.68 0 41.312 33.754 75.066 75.066 75.066 11.082 0 21.664-2.5195 31.234-7.0547zm-31.234-215.12c-36.273 0-65.496-29.223-65.496-65.496 0-36.273 29.223-65.496 65.496-65.496s65.496 29.223 65.496 65.496c-0.003906 36.273-29.223 65.496-65.496 65.496z" />
                      <path d="m500.76 262.46c-2.0156-1.5117-5.0391-1.0078-6.5508 1.0078l-35.77 48.871-23.68-31.234c-1.5117-2.0156-4.5352-2.5195-6.5508-1.0078-2.0156 1.5117-2.5195 4.5352-1.0078 6.5508l27.711 36.273 0.50391 0.50391h0.50391 0.50391 1.0078 0.50391 0.50391 0.50391 0.50391 0.50391 0.50391l0.50391-0.50391 40.809-53.91c1.5117-2.0156 1.0078-5.0391-1.0078-6.5508z" />
                    </g>
                  </g>
                </svg>}
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form  onSubmit={handleSubmitEvent}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e)=>handleInput(e,"email")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  
                  onChange={(e)=>handleInput(e,"password")}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
          <h2 className="text-center font-semibold italic cursor-pointer" onClick={fill}>Use test credentials</h2>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/login.png"
          alt="Image"
          width="1520"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
         
      </div>
     
    </div>
  );
};

export default Login;
