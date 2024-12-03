import React, {  Component, ComponentPropsWithRef, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import bg  from "@/assets/icons/bg.png"

type Props = {}

export const  Card =({
    className,
    children,
    ...other
}: ComponentPropsWithRef<"div">) => {
  return(
   <div className={twMerge(" border border-black/[0.2] dark:border-white/[0.2]  p-6 rounded-3xl relative z-0 overflow-hidden after:z-10 after:content-['] after:absolute after:inset-0  after:outline-2 after:outline after:rounded-3xl after:outline-white/20 after:pointer-events-none",className)} {...other}>
    <div 
    className='absolute inset-0 -z-10  opacity-5'
    style={{backgroundImage:`url(${bg.src})`}}
    >

    </div>
    {children}
   </div>
  )
}


export default Card