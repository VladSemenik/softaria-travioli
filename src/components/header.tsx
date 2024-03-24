import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="p-4 mb-8 text-center text-3xl font-bold text-blue-600 dark:text-blue-500">
      <Link to={"/"} className="hover:underline">
        Travioli
      </Link>
    </header>
  );
};
