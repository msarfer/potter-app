import { ModeToggle } from "@/components/ModeToggle";
import { WandSparkles } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { NavLink, useNavigate } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { authService } from "@/services/auth/AuthService";
import logger from "@/services/logging";
import { Rol } from "@/services/auth/AuthServiceInterface";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { clearHouse, fetchUserHouse } from "@/store/features/houseSlice";
import { ColorHouses } from "@/entities/potterApi";

interface Element {
  path: string;
  name: string;
  hide?: boolean;
}

const NavElement = ({ path, name }: Element) => {
  return (
    <NavLink
      to={`${path}`}
      aria-description={name}
      accessKey={name}
      className={({ isActive }) =>
        `group pointer inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium hover:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 ${
          isActive ? "underline" : ""
        }`
      }
    >
      <FormattedMessage id={`navbar.link.${name}`} />
    </NavLink>
  );
};

export function Navbar() {
  const { user, roles } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { house } = useAppSelector((state) => state.house);
  useEffect(() => {
    dispatch(fetchUserHouse(user?.uid));
  }, [user]);

  const { color, backgroundColor } = useMemo(
    () => ColorHouses[house] || { color: "#000", backgroundColor: "#FFF" },
    [house]
  );

  const links = useMemo(
    () => [
      { path: "/books", name: "books", active: user },
      { path: "/characters", name: "characters", active: user },
      { path: "/spells", name: "spells", active: user },
      { path: "/houses", name: "houses", active: user },
      {
        path: "/dashboard",
        name: "dashboard",
        active: user && roles?.includes(Rol.ADMIN),
      },
      { path: "/login", name: "signin", active: !user },
      { path: "/signup", name: "signup", active: !user },
    ],
    [user, roles]
  );

  const handleLogout = async () => {
    try {
      await authService.signOut();
      dispatch(clearHouse());
      navigate("/login");
    } catch (error) {
      logger.error(`Error al cerrar sesión: ${error} `);
    }
  };

  return (
    <header className="flex h-1/10 w-full shrink-0 items-center px-4 border-b-1">
      <NavLink to="/" className="mr-6 flex text-2xl" style={{ color }}>
        <WandSparkles className="h-8 w-8 mr-3" />
        <h1 className="">Potter App</h1>
      </NavLink>
      <nav className="ml-auto flex gap-6">
        {links.map(
          ({ path, name, active }, index) =>
            active && <NavElement key={index + path} path={path} name={name} />
        )}
        {user && (
          <button
            className={`cursor-pointer group pointer inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium hover:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50`}
            onClick={handleLogout}
          >
            <FormattedMessage id={`navbar.link.logout`} /> ({user.email})
          </button>
        )}
        <ModeToggle />
        <LanguageSelector />
      </nav>
    </header>
  );
}
