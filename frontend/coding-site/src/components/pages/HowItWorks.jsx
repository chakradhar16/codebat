import React from "react";

const HowItWorks = () => {
  return (
    <div className="how-it-works-container bg-gray-50 min-h-screen p-10 space-y-20">

      {/* Section 1 */}
      <section className="about-website bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          About This Website
        </h2>
        <p className="text-lg text-gray-700">
          The main purpose of this application is to help users become proficient in coding.
          It provides an intuitive platform where users can track their progress and monitor
          how many coding questions they have successfully solved.
        </p>
      </section>

      {/* Section 2 */}
      <section className="dashboard-section bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          User Dashboard
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          The dashboard provides detailed statistics on your coding journey, including the number
          of questions solved and the number of days you have been active. This helps you monitor
          your consistency and growth effectively.
        </p>
      </section>

      {/* Section 3 */}
      <section className="problems-section bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Problems
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          The problems section offers a variety of challenges, such as string manipulation and
          logic-building exercises. Each problem is clearly labeled with its type. By solving
          these problems, users gain valuable experience and improve their problem-solving skills.
        </p>
      </section>

      {/* Section 4 */}
      <section className="console-section bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Console
        </h2>
        <p className="text-lg text-gray-700">
          The console allows you to run your code and test it against predefined test cases.
          You can immediately check whether your solution works and debug efficiently.
        </p>
      </section>

    </div>
  );
};

export default HowItWorks;
