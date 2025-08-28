
const Contact = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-white to-pink-50 min-h-screen py-12">
        <div className="container mx-auto w-full px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
              Contact Us
            </h2>
            <p className="mb-6 text-gray-700 text-center">
              Have questions, feedback, or need support? We'd love to hear from you! Fill out the form below or reach us through the provided contact details.
            </p>
            <form className="mb-8 max-w-lg mx-auto space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="name">Name</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="subject">Subject</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  type="text"
                  id="subject"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="message">Message</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  id="message"
                  rows={5}
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition font-semibold w-full"
              >
                Send Message
              </button>
            </form>
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-2 text-pink-700">Contact Details</h3>
              <div className="mb-2">
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:support@statusapp.com" className="text-pink-600 underline">support@statusapp.com</a>
              </div>
              <div className="mb-2">
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:+1234567890" className="text-pink-600 underline">+1 234 567 890</a>
              </div>
              <div>
                <span className="font-medium">Address:</span>{" "}
                123 Status Lane, Creativity City, 45678
              </div>
            </div>
            <div className="mt-8 text-center text-gray-500 text-sm">
              We aim to respond to all inquiries within 24 hours.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
