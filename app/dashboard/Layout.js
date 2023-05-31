"use client";
const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex overflow-hidden flex-col">
      {children}
    </div>
  );
};

export default Layout;
