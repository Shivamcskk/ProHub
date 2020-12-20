import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center" style={{backgroundColor:"white",color:"black"}}>
      Copyright &copy; {new Date().getFullYear()} ProHub
    </footer>
  );
}