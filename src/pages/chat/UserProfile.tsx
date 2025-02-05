import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/common/Header/Header';
import BlockIcon from '@/assets/images/ic_block.png';
import ProfileImg from '@/assets/images/ic_participant1.svg'; // Default profile image
import ActionModal from '@/components/common/Modal/ActionModal';
import BlockModal from '@/components/common/Modal/BlockModal';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfileInfo, MemberData } from '@/apis/profile/getProfile';
import { flexColumn } from '@/styles/CommonStyle';

const Container = styled.div`
  max-width: 390px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  background-color: #707070;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50vh;
`;

const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.COLORS.white};
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  color: white;
`;

const Divider = styled.div`
  width: 120%;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.white};
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  ${flexColumn}
  gap: 5px;
  margin-top: 10px;
  color: #b6b6b6;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

const ExitButton = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const UserProfile = () => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId?: string }>();
  const [profileData, setProfileData] = useState<MemberData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

  const handleBlock = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (memberId) {
        try {
          const data = await getUserProfileInfo(parseInt(memberId, 10));
          setProfileData(data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfile();
  }, [memberId]);

  return (
    <Container>
      <Header title=" " showBackButton onBackClick={() => navigate(-1)} />
      <CenterContainer>
        <ProfileIcon
          src={profileData?.profileImageUrl || ProfileImg}
          alt="Profile Image"
        />
        <Name>
          {profileData
            ? `${profileData.nickname} | ${profileData.mbti}`
            : 'Loading...'}
        </Name>
        <Divider />
        <ButtonContainer>
          <ExitButton src={BlockIcon} alt="Block User" onClick={handleBlock} />
          차단
        </ButtonContainer>
      </CenterContainer>
      {isModalOpen && (
        <ActionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          actions={[
            {
              label: 'Block',
              onClick: () => {
                setIsBlockModalOpen(true);
                setIsModalOpen(false);
              },
            },
            {
              label: 'Cancel',
              onClick: () => setIsModalOpen(false),
            },
          ]}
        />
      )}
      {isBlockModalOpen && (
        <BlockModal
          isReport={false}
          onClose={() => setIsBlockModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default UserProfile;
