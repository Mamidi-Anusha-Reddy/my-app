import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container text-center mt-5">
      <h2>Welcome to the Credit Card Application Portal</h2>
      <p>Click below to apply for a credit card.</p>
      <Link to="/" className="btn btn-primary">Go to Application Form</Link>
    </div>
  );
}

export default HomePage;
