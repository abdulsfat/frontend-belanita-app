import LoginForm from "@/app/_components/Form/LoginForm";

export default function LoginPage() {
    return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
                    <div className="flex justify-center mb-6">
                        <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain"/>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">Login</h2>
                    <LoginForm/>
                    <p className="mt-4 text-center text-sm text-secondary">
                        Belum punya akun?{" "}
                        <a href="/register"
                           className="text-secondary/60 hover:text-secondary hover:underline font-semibold">
                            Daftar di sini
                        </a>
                    </p>
                </div>
            </div>
    );
}
