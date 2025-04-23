import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center font-bold hover:opacity-80">
      <img
        src="/Logo.png"
        alt="padelo-logo"
        className="w-20 h-20 object-contain -my-3 -me-3 -ms-6"
      />
      <span className="text-[#009c85] text-2xl">Padelo.</span>
    </Link>
  );
}
