import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Drivers", path: "/dashboard/drivers" },
  { name: "History", path: "/dashboard/history" },
  { name: "Marketplace", path: "/dashboard/marketplace" },
  { name: "Chat", path: "/dashboard/chat" },
  { name: "Daily Activity", path: "/dashboard/daily-activity" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-gray-800 h-screen">
      <div className="p-4">
        <h2 className="text-white text-2xl font-semibold">Distribr</h2>
      </div>
      <ul className="mt-8">
        {navItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link href={item.path}>
              <span
                className={`block p-4 text-sm font-semibold ${
                  pathname === item.path
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
