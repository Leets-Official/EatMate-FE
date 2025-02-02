import { Text } from '@/styles/mypage/mypage.styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '@/assets/images/ic_eatmate_white_logo.svg?react';
import styled from 'styled-components';
import { flexColumnCenter } from '@/styles/CommonStyle';
import { motion } from 'framer-motion';

const Flex = styled(motion.div)`
  ${flexColumnCenter}
  gap: 10px;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.COLORS.main};
`;

const Splash: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav('/intro');
    }, 3000);

    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <Flex
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: 'easeInOut' }}
    >
      <Text fontSize="smMd" color="white">
        모두를 잇다
      </Text>
      {/* <motion.div
        initial={{ fill: '#FFFFFF' }}
        animate={{ fill: '#F3AA24' }}
        transition={{ duration: 3, ease: 'easeOut' }}
      > */}
      <LogoIcon />
      {/* </motion.div> */}
    </Flex>
  );
};

export default Splash;
