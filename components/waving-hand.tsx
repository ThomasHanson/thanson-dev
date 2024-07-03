import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const WavingHand = () => {
  return (
    <motion.div
      style={{
        marginBottom: "-20px",
        marginRight: "-45px",
        paddingBottom: "20px",
        paddingRight: "45px",
        display: "inline-block",
      }}
      animate={{ rotate: [0, 20, 0] }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0,
      }}
    >
      <Image
        src="/images/waving-hand-emoji.png"
        width={40}
        height={40}
        alt="Waving hand emoji"
      />
      </motion.div>
  )
}

export default WavingHand