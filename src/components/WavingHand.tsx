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
      animate={{ rotate: 20 }}
    >
      👋
    </motion.div>
  );
};

export default WavingHand;
