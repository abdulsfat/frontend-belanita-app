import {Upload} from "lucide-react";

export default function Complaints() {
  return (
    <div className=" py-20 px-4 mt-5 sm:px-6 lg:px-8 flex flex-col justify-between items-center">
      {/* banner */}
      <div className="w-full mx-auto">
        <img
          src="/complaints.png"
          alt="We Will Not Be Silenced"
          className="rounded-3xl shadow-lg h-[32rem] w-full object-cover mb-10"
        />
      </div>

      {/* tulisan*/}
      <div className=" w-full grid grid-flow-col grid-rows-3 gap-10 items-start mb-28 justify-between">
        <div className="col-span-2 row-span-4">
          <h2 className="text-7xl font-normal text-gray-900 leading-tight">
            Your Voice Matters. We're <br /> Here to Help.
          </h2>
        </div>
        <div className="row-span-3">
          <p className="text-md text-gray-800">
            We are committed to providing a safe and supportive environment for all women.
            Don’t hesitate to reach out and share your concerns. Your voice is important,
            and we are here to listen, support, and take action. Together, we can make a
            difference and ensure a safer future for everyone.
          </p>
        </div>
      </div>

      {/* isi form */}
      <div className="w-4/5 ">
        <h2 className="text-5xl font-normal text-center text-gray-900 mb-2">Complaint Form</h2>
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
                  <Upload className="h-8 w-8 mb-3"/>
              <input className="w-60 bg-lime-600 text-white px-9 py-2 rounded-lg hover:bg-purple-700 transition" id="file_input" type="file"></input>
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
