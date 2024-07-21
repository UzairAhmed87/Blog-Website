import React from 'react'

export default function Button({
children,
type = "button",
bgColor = "bg-red-700",
textColor = "text-white",
className = "",
...props
}) {
    

    return (
        <>
           <button className={`px-4 py-2 rounded-xl hover:scale-105 transition-all ${className} ${bgColor} ${textColor}`}{...props}>{children}</button> 
        </>
    )
}
