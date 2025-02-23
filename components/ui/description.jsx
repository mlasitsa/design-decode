import React from 'react'

const Description = ({text}) => {
  return (
    <>
    <p 
      className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-[90%] sm:max-w-2xl"
      dangerouslySetInnerHTML={{ __html: text }} 
    />
    </>
  )
}

export default Description