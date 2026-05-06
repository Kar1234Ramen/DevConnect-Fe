import React from "react";

const Premium = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-10">
      <div className="flex flex-col gap-10 md:flex-row  w-full max-w-5xl">
        {/* Silver Card */}
        <div className="card bg-base-300 shadow-xl p-6 flex-1 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-center mb-4">
            Silver Membership
          </h2>

          <ul className="space-y-2 text-sm opacity-80 mb-6">
            <li>✔ Chat with others</li>
            <li>✔ 50 connection requests/day</li>
            <li>✔ Get verified</li>
            <li>✔ 90 days access</li>
          </ul>

          <button className="btn btn-secondary w-full">Buy Now</button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center text-lg font-semibold opacity-50">
          OR
        </div>

        {/* Gold Card */}
        <div className="card bg-base-300 shadow-xl p-6 flex-1 border-2 border-primary hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-center mb-4 text-primary">
            Gold Membership
          </h2>

          <ul className="space-y-2 text-sm opacity-80 mb-6">
            <li>✔ Chat with others</li>
            <li>✔ 100 connection requests/day</li>
            <li>✔ Get verified</li>
            <li>✔ 180 days access</li>
          </ul>

          <button className="btn btn-primary w-full">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
