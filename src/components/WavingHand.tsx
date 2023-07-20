import { motion } from 'framer-motion';

const WavingHand = () => {
  return (
    <motion.div
      style={{
        marginBottom: '-20px',
        marginRight: '-45px',
        paddingBottom: '20px',
        paddingRight: '45px',
        display: 'inline-block',
      }}
      animate={{
        rotate: 20,
      }}
      transition={{
        repeat: Infinity, // Repeat the animation infinitely
        repeatType: 'reverse', // Reverse the animation after each iteration
        duration: 0.75, // Duration of each animation cycle (in seconds)
      }}
    >
      👋
    </motion.div>
  );
};

export default WavingHand;
