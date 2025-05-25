
"use client";

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
    <div className="flex justify-center mb-6">
          <img
            src="/Logo.png"  
            alt="Logo"
            className="h-16 w-16 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">Login</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-purple-600">
          Belum punya akun?{' '}
          <a href="\register" className="text-purple-600 hover:underline">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
}
