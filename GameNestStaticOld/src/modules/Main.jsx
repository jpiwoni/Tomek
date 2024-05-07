import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/main";

function Main() {
  return (
    <>
      <div className="wrapper">
        {(
          <>
            <Header />
            {/* <Sidebar /> */}
            <div className="content-wrapper pb-4">
              <div className="pt-3" />
              <section className="content">
                <Outlet />
              </section>
            </div>
            {/* <Footer /> */}
          </>
        )}
      </div>
    </>
  );
}

export default Main;
