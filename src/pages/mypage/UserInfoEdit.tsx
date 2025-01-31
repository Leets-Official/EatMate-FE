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
import {
  patchProfileData,
  patchProfileInfo,
} from '@/apis/profile/patchProfile';

const UserInfoEdit: React.FC = () => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<ProfileData | null>(null);
  const [editedUserInfo, setEditedUserInfo] = useState({
    nickname: '',
    mbti: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleInputChange = (
    field: 'nickname' | 'mbti',
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedUserInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileInfo();
        console.log('받아온 유저 데이터: ', data);
        setUserInfo(data);
        setEditedUserInfo({
          nickname: data.nickname || '',
          mbti: data.mbti || '',
        });
      } catch (error) {
        console.error('프로필 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    const updatedData: patchProfileData = {
      profileImage: null,
    };

    if (editedUserInfo.nickname !== userInfo?.nickname) {
      updatedData.nickname = editedUserInfo.nickname;
    }
    if (editedUserInfo.mbti !== userInfo?.mbti) {
      updatedData.mbti = editedUserInfo.mbti;
    }
    if (selectedImage) {
      updatedData.profileImage = selectedImage;
    }

    if (Object.keys(updatedData).length === 0) {
      console.log('변경된 정보 없음. 요청 안 보냄.');
      return;
    }

    try {
      await patchProfileInfo(updatedData);
      console.log('프로필 수정 성공');
      nav('/mypage');
    } catch (error) {
      console.error('프로필 수정 중 오류 발생:', error);
    }
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
      value: editedUserInfo.nickname,
      readOnly: false,
      marginBottom: '-30px',
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleInputChange('nickname', e),
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
      value: editedUserInfo.mbti,
      readOnly: false,
      marginBottom: '-30px',
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleInputChange('mbti', e),
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

  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="회원정보 수정"
      />
      <S.Container>
        <S.ProfileWrapper onClick={() => setIsModalOpen(true)}>
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
                onChange={field.onChange}
              />
              {field.extra && field.extra}
            </InputWrapper>
          ))}
        </S.FormContainer>

        <S.ButtonContainer>
          <Button
            variant="primary"
            size="lg"
            rounded="sm"
            onClick={handleSubmit}
          >
            확인
          </Button>
        </S.ButtonContainer>
      </S.Container>

      {/* 프로필 사진 수정 모달 */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actions={[
          {
            label: '앨범에서 선택',
            onClick: () => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/*';
              fileInput.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  setSelectedImage(file);
                }
              };
              fileInput.click();
              setIsModalOpen(false);
            },
          },
          {
            label: '기본 이미지로 변경',
            onClick: () => {
              setSelectedImage(null);
              setIsModalOpen(false);
            },
            type: 'delete',
          },
          {
            label: '닫기',
            onClick: () => setIsModalOpen(false),
          },
        ]}
      />
    </div>
  );
};

export default UserInfoEdit;
