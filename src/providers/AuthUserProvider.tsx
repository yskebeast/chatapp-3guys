import {createContext, ReactNode} from "react"

export const AuthUserContext = createContext<any>({})

export const AuthUserProvider = (props:{children: ReactNode}) => {
  const {children} = props
  return (
    <AuthUserContext.Provider value>
      {children}
    </AuthUserContext.Provider>
  )
}