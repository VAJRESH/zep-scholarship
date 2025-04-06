import { Link } from "react-router-dom";
import { ThemeToggle } from "./ui";
import { useState, useEffect } from "react";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg
                  className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2"
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
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  Scholarship Portal
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-28 pb-16 sm:pt-36 lg:pt-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-y-0 right-1/3 w-[200%] -translate-x-1/2 bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 opacity-50 rounded-[40%] blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
              <span className="block mb-2">Empower Your Education</span>
              <span className="block text-blue-600 dark:text-blue-400 drop-shadow-md">
                With Our Scholarships
              </span>
            </h1>
            <p className="mt-8 max-w-lg mx-auto text-xl text-gray-600 dark:text-gray-300 sm:max-w-3xl">
              We provide financial support to deserving students to help them
              achieve their academic goals. From school fees to study materials,
              we've got you covered.
            </p>
            <div className="mt-12 flex justify-center gap-x-6">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Apply Now
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[calc(50%-30rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Supporting Your Educational Journey
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Our scholarship program offers various types of financial
              assistance
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group">
                <div className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="bg-blue-600 dark:bg-blue-700 p-6 text-center">
                    <span className="inline-flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
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
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      School Fees
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Funding for tuition, admission, and other academic fees to
                      help students stay in school and focus on their studies
                      without financial stress.
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to="/register"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="bg-blue-600 dark:bg-blue-700 p-6 text-center">
                    <span className="inline-flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
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
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Travel Expenses
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Assistance for students who need to travel to reach their
                      educational institutions, ensuring transportation is never
                      a barrier to education.
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to="/register"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="bg-blue-600 dark:bg-blue-700 p-6 text-center">
                    <span className="inline-flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
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
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Study Materials
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Support for purchasing textbooks and other essential study
                      materials needed for academic success and achieving your
                      full potential.
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to="/register"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20 opacity-50 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Hear from students who have benefited from our scholarship program
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 transform transition duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                  RS
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    Rajiv Sharma
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Computer Engineering Graduate
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic text-lg">
                "The scholarship program helped me complete my engineering
                degree when I was facing financial difficulties. I'm now working
                as a software engineer and giving back to my community."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 transform transition duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                  PP
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    Priya Patel
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Medical Student
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic text-lg">
                "Without the travel expenses support, I wouldn't have been able
                to continue my studies. The scholarship made it possible for me
                to attend college despite living in a remote area."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                500+
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Students Supported
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                ₹5M+
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Funding Provided
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                95%
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Graduation Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                10+
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Years of Service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[10px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-30">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {[...Array(10)].map((_, i) => (
                <path
                  key={i}
                  d={`M${i * 10},0 Q${i * 10 + 5},${50 + (i % 3) * 10} ${
                    i * 10 + 10
                  },0`}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Apply?
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Don't let financial constraints stop your education. Apply for our
              scholarship today.
            </p>
            <div className="mt-10">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 pt-12 pb-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Scholarships
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/register"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    School Fees
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Travel Expenses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Study Materials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/how-to-apply"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    How to Apply
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-to-apply"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/about-us"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2"
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
              <span className="text-gray-600 dark:text-gray-300">
                Scholarship Portal
              </span>
            </div>
            <p className="mt-4 md:mt-0 text-base text-gray-400">
              &copy; {new Date().getFullYear()} Scholarship Portal. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
