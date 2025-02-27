import { ModeToggle } from "@/components/ModeToggle";
import { WandSparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Element {
  path: string;
  name: string;
  hide?: boolean;
}

const elements: Element[] = [
  { path: "/books", name: "Books" },
  { path: "/characters", name: "Characters" },
  { path: "/spells", name: "Spells" },
  { path: "/dashboard", name: "Dashboard" },
];

const NavElement = ({ path, name }: Element) => {
  return (
    <NavLink
      to={`${path}`}
      className={({isActive}) => `group pointer inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium hover:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 ${isActive ? 'underline': ''}`}
    >
      {name}
    </NavLink>
  );
};

export function Navbar() {
  return (
    <header className="flex h-1/10 w-full shrink-0 items-center px-4 border border-b-1">
      <NavLink to="/" className="mr-6 flex text-2xl">
        <WandSparkles className="h-8 w-8 mr-3" />
        <h1 className="">Potter App</h1>
      </NavLink>
      <nav className="ml-auto flex gap-6">
        {elements.map(({ path, name }, index) => (
          <NavElement key={index + path} path={path} name={name} />
        ))}
        <ModeToggle />
      </nav>
    </header>
  );
}
