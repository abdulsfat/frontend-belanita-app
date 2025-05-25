"use client";

export default function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register form submitted");
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
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div>
            <label className="block text-gray-700">Usia</label>
            <input
              type="date"
              name="Usia"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan password"
            />
          </div>
          <div>
            <label className="block text-gray-700">Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ulangi password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-purple-600">
          Sudah punya akun?{' '}
          <a href="\login" className="text-purple-600 hover:underline">Login di sini</a>
        </p>
      </div>
    </div>
  );
}
