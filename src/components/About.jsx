import React from "react";
import NotebookIcon from "./icons/NotebookIcon";

const About = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <NotebookIcon width={48} height={48} />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">About Notes App</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Notes App is a lightweight, fast and secure place to capture and organize your thoughts.
            Create notes with tags, upload images, and keep everything synced to your account.
          </p>
        </div>

        <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Organize</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              Add tags, search and filter your notes to keep everything organised and easy to find.
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Secure</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              Authentication with JWT ensures your notes are private to your account.
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Share</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              Upload images and include context in your notes. Export or share as needed.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our mission</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Build delightful, minimal tools that help people focus on their ideas. Notes App is designed to be
            fast, privacy-minded, and simple to use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
