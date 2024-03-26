"use client"

import { ComponentProps } from "react"
import {useFormStatus} from "react-dom"

type FormSubmitButtonProps={
    children:React.ReactNode,
    className?:string,
}& ComponentProps<"button">

const FormSubmissionButton = ({children,className,...props}:FormSubmitButtonProps) => {

    const {pending} = useFormStatus()
  return (
    <button {...props} disabled={pending} type="submit" className={`btn btn-primary ${className}`}>
        {pending && <span className="loadingn loading-spinner"/>}
        {children}
    </button>
  )
}

export default FormSubmissionButton