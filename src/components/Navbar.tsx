import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, WandSparkles } from "lucide-react"
import { ReactNode } from "react"
import { Link } from "react-router-dom"


interface ElementProps {
  path: string
  children: ReactNode
}
const SideElement = ({ path, children}: ElementProps) => {
  return <Link to={`${path}`} className="flex w-full items-center py-2 text-lg font-semibold">{children}</Link>
}

const NavElement = ({ path, children}: ElementProps) => {
  return <Link to={`${path}`} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">{children}</Link>
}

const elements = [
  {path: '/', children: <h1>Home</h1>},
  {path: '/', children: <h1>Books</h1>},
  {path: '/', children: <h1>Characters</h1>},
  {path: '/', children: <h1>Spells</h1>},
]

export function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link to="/" className="mr-6 hidden lg:flex text-2xl" >
        <WandSparkles className="h-8 w-8 mr-3" />
        <h1 className="">Potter App</h1>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {elements.map(({path, children}) => <NavElement path={path}>{children}</NavElement>)}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link to="#" className="mr-6 hidden lg:flex">
            <WandSparkles className="h-6 w-6" />
            <h1>Potter app</h1>
          </Link>
          <div className="grid gap-2 py-6">
            {elements.map(({path, children}) => <SideElement path={path}>{children}</SideElement>)}
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}