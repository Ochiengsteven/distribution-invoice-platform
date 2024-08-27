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
    <nav className="w-64 bg-white h-screen">
      <div className="p-4">
        <h2 className="text-primary text-2xl font-semibold">Distribr</h2>
      </div>
      <ul className="mt-4">
        {navItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link href={item.path}>
              <span
                className={`block p-4 text-sm font-semibold ${
                  pathname === item.path
                    ? "bg-gray-50 text-primary"
                    : "text-primary hover:bg-gray-100 hover:text-gray-400"
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
