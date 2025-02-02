import { Text } from '@/styles/mypage/mypage.styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '@/assets/images/ic_eatmate_white_logo.svg?react';
import styled from 'styled-components';
import { flexColumnCenter } from '@/styles/CommonStyle';

const Flex = styled.div`
  ${flexColumnCenter}
  gap:10px;
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

  // 애니메이션 나중에 추가 예정
  return (
    <Flex>
      <Text fontSize="smMd" color="white">
        모두를 잇다
      </Text>
      <LogoIcon />
    </Flex>
  );
};

export default Splash;
