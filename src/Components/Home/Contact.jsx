import React from "react";

const Contact = ({ theme }) => {
  return (
    <section
      className={`py-16 px-6 ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">📞 Contact Us</h2>
          <p className="mb-4">
            Have questions or feedback? Reach out to us anytime.
          </p>
          <ul className="space-y-3">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:mastermoviepro@gmail.com"
                className="hover:underline"
              >
                mastermoviepro@gmail.com
              </a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span> 01309482127
            </li>
            <li>
              <span className="font-semibold">Address:</span> Sylhet, Bangladesh
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6">📩 Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className={`w-full p-3 rounded-lg border focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className={`w-full p-3 rounded-lg border focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className={`w-full p-3 rounded-lg border focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
