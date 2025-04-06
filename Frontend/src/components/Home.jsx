import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <header className="relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Empower Your Education</span>
              <span className="block text-blue-600 dark:text-blue-400">
                With Our Scholarships
              </span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500 dark:text-gray-300 sm:max-w-3xl">
              We provide financial support to deserving students to help them
              achieve their academic goals. From school fees to study materials,
              we've got you covered.
            </p>
            <div className="mt-10 flex justify-center gap-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                Apply Now
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Supporting Your Educational Journey
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Our scholarship program offers various types of financial
              assistance
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 dark:bg-blue-600 rounded-md shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-gray-900 dark:text-white tracking-tight">
                      School Fees
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Funding for tuition, admission, and other academic fees to
                      help students stay in school.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 dark:bg-blue-600 rounded-md shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-gray-900 dark:text-white tracking-tight">
                      Travel Expenses
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Assistance for students who need to travel to reach their
                      educational institutions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 dark:bg-blue-600 rounded-md shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-gray-900 dark:text-white tracking-tight">
                      Study Materials
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Support for purchasing textbooks and other essential study
                      materials needed for academic success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Hear from students who have benefited from our scholarship program
            </p>
          </div>
          <div className="mt-12 space-y-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <p className="text-gray-500 dark:text-gray-300 italic">
                "The scholarship program helped me complete my engineering
                degree when I was facing financial difficulties. I'm now working
                as a software engineer and giving back to my community."
              </p>
              <div className="mt-4 flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Rajiv Sharma
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Computer Engineering Graduate
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <p className="text-gray-500 dark:text-gray-300 italic">
                "Without the travel expenses support, I wouldn't have been able
                to continue my studies. The scholarship made it possible for me
                to attend college despite living in a remote area."
              </p>
              <div className="mt-4 flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Priya Patel
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Medical Student
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Apply?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
              Don't let financial constraints stop your education. Apply for our
              scholarship today.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Scholarship Portal. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
