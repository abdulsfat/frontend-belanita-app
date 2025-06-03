
export default function Complaints() {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      {/* banner */}
      <div className="w-270 mx-auto">
        <img
          src="/complaints.png"
          alt="We Will Not Be Silenced"
          className="rounded-3xl shadow-lg w-full object-cover mb-16"
        />
      </div>

      {/* tulisan*/}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-20">
        <div>
          <h2 className="text-5xl font-semibold text-gray-900 leading-tight">
            Your Voice Matters. <br /> We're Here to Help.
          </h2>
        </div>
        <div>
          <p className="text-lg text-gray-800">
            We are committed to providing a safe and supportive environment for all women.
            Don’t hesitate to reach out and share your concerns. Your voice is important,
            and we are here to listen, support, and take action. Together, we can make a
            difference and ensure a safer future for everyone.
          </p>
        </div>
      </div>

      {/* isi form */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold text-center text-gray-900 mb-2">Complaint Form</h2>
        <p className="text-center text-lg text-gray-700 mb-10">
          Please Fill Out the Form Below to Submit Your Complaint
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* form kiri */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="mt-1 w-full rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="janesmith@example.com"
                className="mt-1 w-full rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Location"
                className="mt-1 w-full rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 p-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+62"
                  className="mt-1 w-full rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Incident</label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 p-3"
                />
              </div>
            </div>
          </div>

          {/* form kanan */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-100 px-4 py-6 text-center text-sm text-gray-500">
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-upload"
                  >
                    <path d="M12 3v12" />
                    <path d="m17 8-5-5-5 5" />
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  </svg>
          
              <input class="w-60 bg-lime-600 text-white px-9 py-2 rounded-lg hover:bg-purple-700 transition" id="file_input" type="file"></input>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows="6"
                placeholder="Write your detail case here"
                className="mt-1 w-full rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 p-3"
              ></textarea>
            </div>
          </div>
        </form>

        {/* note bawah */}
        <div className="mt-8 text-sm italic text-gray-600 space-y-1">
          <p>*Your privacy is our priority. All complaints are handled with the utmost confidentiality.</p>
          <p>*Our team is available around the clock to assist you.</p>
        </div>

        {/* tombol */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-lime-300 text-black font-semibold py-3 px-8 rounded-full hover:bg-lime-400 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
