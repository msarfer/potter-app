"use client"


import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LanguageContext } from "@/providers/LanguageProvider"
import { Languages } from "lucide-react"
import { useContext } from "react"
import { FormattedMessage } from "react-intl"

const languages = ["en", "es"] as const

export function LanguageSelector() {

  const { changeLanguage } = useContext(LanguageContext)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {
          languages.map((locale) => (
            <DropdownMenuItem key={locale} onClick={() => changeLanguage(locale)}>
              <FormattedMessage id={`app.lang.${locale}`}/>
            </DropdownMenuItem>

          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
