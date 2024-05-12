import React from "react";

const Home = () => {
  // TODO: Get this from the store
  const user = {
    role: "ADMIN",
  };
  //
  return (
    <div className="container">
      <header className="bg-light p-5 rounded-lg m-3">
        <h1>Welcome to Mortacycle Service and Repair Management</h1>
        <p>
          Welcome to Mortacycle Service and Repair Management. Make and
          appoinment, check your service history, and more.
        </p>
        {user && (
          <>
            <button className="btn btn-primary mx-2">
              <a
                href={user.role === "ADMIN" ? "/admin" : "/customer"}
                className="text-white text-decoration-none"
              >
                {user.role === "ADMIN" ? "Admin Panel" : "Customer Panel"}
              </a>
            </button>
          </>
        )}

        {!user && (
          <>
            <p>
              Please <a href="/login">login</a> to continue
            </p>
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </>
        )}
      </header>
    </div>
  );
};

export default Home;
