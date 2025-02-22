import { ModeToggle } from "@/components/ModeToggle"
import { WandSparkles } from "lucide-react"
import { ReactNode } from "react"
import { NavLink } from "react-router-dom"


interface Element {
  path: string
  children: ReactNode
  hide?: boolean
}

const elements: Element[] = [
  {path: '/books', children: <h1>Books</h1>},
  {path: '/characters', children: <h1>Characters</h1>},
  {path: '/spells', children: <h1>Spells</h1>},
  {path: '/dashboard', children: <h1>Dashboard</h1>},
  {path: '/', children: <h1>Sign in</h1>},
  {path: '/', children: <h1>Sign up</h1>},
  {path: '/', children: <h1>Log out</h1>}
]

const NavElement = ({ path, children }: Element) => {
  return <NavLink to={`${path}`} className="group pointer inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">{children}</NavLink>
}

export function Navbar() {
  return (
    <header className="flex h-1/10 w-full shrink-0 items-center px-4">
      <NavLink to="/" className="mr-6 flex text-2xl" >
        <WandSparkles className="h-8 w-8 mr-3" />
        <h1 className="">Potter App</h1>
      </NavLink>
      <nav className="ml-auto flex gap-6">
        {elements.map(({path, children}, index) => <NavElement key={index + path} path={path}>{children}</NavElement>)}
        <ModeToggle/>
      </nav>
    </header>
  )
}