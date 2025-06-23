import React, { useEffect, useState } from 'react'

const useMobile = (breakPoint = 768) => {
  const [isMobile,setIsMobile] = useState()

  const handleResize = ()=>{
    const checkPoint = window.innerWidth < breakPoint
    setIsMobile(checkPoint)
  }

  useEffect(()=>{
    handleResize()
    window.addEventListener("resize", handleResize)

    return ()=>{window.addEventListener("resize",handleResize)}
  })
  return [isMobile]
}

export default useMobile