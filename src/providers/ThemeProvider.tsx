"use client"

import { ThemeContext, ThemeContextProvider, ThemeContextType } from "@/context/ThemeContext";
import { ReactNode, useContext, useEffect, useState } from "react";

const ThemeProvider = ({children}:{children:ReactNode}) => {
   
    const { theme } = useContext(ThemeContext) as ThemeContextType;
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (mounted) {
      return <div className={theme}>{children}</div>;
    }
    // const { theme } = useContext(ThemeContext) as ThemeContextType

    // return (<div className={theme}>
    //     <ThemeContextProvider>{children}</ThemeContextProvider>;
    // </div>)
}
 
export default ThemeProvider;