import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { SerializedError } from "@reduxjs/toolkit"
import { AlertCircle } from "lucide-react"

interface AlertProps {
  message: string | SerializedError
}

export default function AlertError({ message }: AlertProps){
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        { message.toString() }
      </AlertDescription>
    </Alert>
  )
}
