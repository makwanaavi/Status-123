import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-12">
        <div className="container mx-auto  px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
              About StatusApp
            </h2>
            <p className="mb-6 text-gray-700 text-center">
              <span className="font-bold text-pink-600">StatusApp</span> is your
              go-to platform for sharing, discovering, and saving creative status
              updates for all occasions. Whether you want to express your mood,
              share a thought, or find inspiration, StatusApp provides a vibrant
              community and a rich collection of statuses across various
              categories.
            </p>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-700">
                Our mission is to connect people through words and creativity. We
                believe that a simple status can brighten someone's day, spark a
                conversation, or inspire new ideas. StatusApp empowers users to
                express themselves and connect with others in meaningful ways.
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-700">
                To become the world's leading platform for creative
                self-expression, fostering a global community where everyone can
                share their voice and inspire others.
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Features
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>
                  Browse and search thousands of statuses in multiple categories.
                </li>
                <li>Create and share your own statuses with the community.</li>
                <li>Save your favorite statuses for quick access.</li>
                <li>Like and bookmark statuses you enjoy.</li>
                <li>Personalized user profiles and avatars.</li>
                <li>Responsive design for all devices.</li>
                <li>
                  Secure and private user data management.
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Meet the Team
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-pink-50 rounded-lg p-4 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-pink-200 mb-2 flex items-center justify-center text-2xl font-bold text-pink-700">
                    A
                  </div>
                  <div className="font-semibold">Avi Makwana</div>
                  <div className="text-sm text-gray-600">
                    Founder & Product Lead
                  </div>
                </div>
                <div className="flex-1 bg-pink-50 rounded-lg p-4 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-pink-200 mb-2 flex items-center justify-center text-2xl font-bold text-pink-700">
                    R
                  </div>
                  <div className="font-semibold">Riya Patel</div>
                  <div className="text-sm text-gray-600">Community Manager</div>
                </div>
                <div className="flex-1 bg-pink-50 rounded-lg p-4 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-pink-200 mb-2 flex items-center justify-center text-2xl font-bold text-pink-700">
                    S
                  </div>
                  <div className="font-semibold">AD Makwana</div>
                  <div className="text-sm text-gray-600">Lead Developer</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-700">
                Join{" "}
                <span className="font-bold text-pink-600">StatusApp</span> today
                and become part of a growing community that celebrates creativity
                and connection!
              </p>
              <a
                href="/"
                className="inline-block mt-6 bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
