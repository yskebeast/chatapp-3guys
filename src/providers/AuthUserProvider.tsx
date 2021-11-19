import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react"
import {createContext} from "react"

export const AuthUserContext = createContext<any>({})

export const AuthUserProvider = (props:{children: ReactNode}) => {
  const {children} = props
  return (
    <AuthUserContext.Provider value>
      {children}
    </AuthUserContext.Provider>
  )
}