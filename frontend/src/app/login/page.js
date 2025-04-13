// app/(auth)/login/page.js
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className=" text-black min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <AuthForm type="login" />
      </div>
    </div>
  );
}
