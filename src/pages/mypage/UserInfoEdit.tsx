import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/mypage/userInfoEdit.styled';
import { Input } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { InputWrapper } from '@/components/common/Input/styles';
import editIcon from '@/assets/images/ic_edit_camera.svg';
import googleIcon from '@/assets/images/GoogleIcon.svg';
import { useEffect, useState } from 'react';
import ActionModal from '@/components/common/Modal/ActionModal';
import { getProfileInfo, ProfileData } from '@/apis/profile/getProfile';
import { ProfileIcon } from '@/styles/SignUp/IntroPage.styled';

const UserInfoEdit: React.FC = () => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<ProfileData | null>(null);

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const inputFields = [
    {
      label: '아이디',
      value: userInfo?.email || '',
      readOnly: true,
      marginBottom: '-10px',
      extra: (
        <S.GoogleText>
          <S.GoogleIcon src={googleIcon} alt="google" />
          <div>구글 로그인 사용중</div>
        </S.GoogleText>
      ),
    },
    {
      label: '닉네임',
      value: userInfo?.nickname || '',
      readOnly: false,
      marginBottom: '-30px',
    },
    {
      label: '학번',
      value: userInfo?.studentNumber || '',
      readOnly: true,
      marginBottom: '-30px',
    },
    {
      label: '전화번호',
      value: userInfo?.phoneNumber || '',
      readOnly: true,
      marginBottom: '-30px',
    },
    {
      label: 'MBTI',
      value: userInfo?.mbti || '',
      readOnly: false,
      marginBottom: '-30px',
    },
    {
      label: '생년월일',
      value: userInfo?.birthDate?.year
        ? `${userInfo.birthDate.year}.${userInfo.birthDate.month}.${userInfo.birthDate.day}`
        : '정보 없음',
      readOnly: true,
      marginBottom: '0px',
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileInfo();
        console.log('받아온 유저 데이터: ', data);
        setUserInfo(data);
      } catch (error) {
        console.error('프로필 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="회원정보 수정 "
      />
      <S.Container>
        <S.ProfileWrapper onClick={handleProfileClick}>
          <S.ProfileImage
            src={userInfo?.profileImageUrl || ProfileIcon}
            alt="profile"
          />
          <S.EditIconWrapper>
            <S.EditIcon src={editIcon} alt="edit-profile" />
          </S.EditIconWrapper>
        </S.ProfileWrapper>
        <S.FormContainer>
          {inputFields.map((field, index) => (
            <InputWrapper key={index} marginBottom={field.marginBottom}>
              <Input
                label={field.label}
                value={field.value}
                readOnly={field.readOnly}
                keepBackground
              />
              {field.extra && field.extra}
            </InputWrapper>
          ))}
        </S.FormContainer>
        <S.ButtonContainer>
          <Button variant="primary" size="lg" rounded="sm">
            확인
          </Button>
        </S.ButtonContainer>
      </S.Container>

      <ActionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        actions={[
          {
            label: '앨범에서 선택',
            onClick: () => {
              console.log('사진 변경 클릭');
              closeModal();
            },
          },
          {
            label: '기본 이미지로 변경',
            onClick: () => {
              console.log('기본 이미지로 변경 클릭');
              closeModal();
            },
            type: 'delete',
          },
          {
            label: '닫기',
            onClick: closeModal,
          },
        ]}
      />
    </div>
  );
};

export default UserInfoEdit;
