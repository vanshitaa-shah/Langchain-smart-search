import React from "react";
import { ShoppingBag } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
      <h1 className="text-3xl font-bold text-white flex items-center gap-3">
        <ShoppingBag className="w-8 h-8" />
        Smart Product Search
      </h1>
      <p className="text-blue-100 mt-2">
        Search using natural language - powered by LangChain
      </p>
    </div>
  );
};

export default Header;
