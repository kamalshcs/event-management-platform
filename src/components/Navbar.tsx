import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1 className="font-bold text-xl">
        Event Platform
      </h1>

      <div className="flex gap-4 items-center">
        <Link to="/">Events</Link>
        <Link to="/bookings">My Bookings</Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;