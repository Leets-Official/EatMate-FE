import { Text } from '@/styles/mypage/mypage.styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '@/assets/images/ic_eatmate_white_logo.svg?react';
import styled from 'styled-components';
import { flexColumnCenter } from '@/styles/CommonStyle';
import { motion } from 'framer-motion';

const Flex = styled(motion.div)`
  ${flexColumnCenter}
  gap: 15px;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.COLORS.main};
`;

const AnimatedLogo = styled(motion.div)``;

const Splash: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav('/intro');
    }, 4000);

    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <Flex>
      <Text fontSize="smMd" color="white">
        모두를 잇다
      </Text>

      <AnimatedLogo
        initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
      >
        <motion.div
          initial={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <LogoIcon />
        </motion.div>
      </AnimatedLogo>
    </Flex>
  );
};

export default Splash;
