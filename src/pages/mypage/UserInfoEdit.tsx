import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/mypage/userInfoEdit.styled';
import Button from '@/components/common/Button/Button';
import editIcon from '@/assets/images/ic_edit_camera.svg';
import { useEffect, useState } from 'react';
import ActionModal from '@/components/common/Modal/ActionModal';
import { getProfileInfo, ProfileData } from '@/apis/profile/getProfile';
import ProfileIcon from '@/assets/images/ic_my_profile.svg';
import {
  patchProfileData,
  patchProfileInfo,
} from '@/apis/profile/patchProfile';
import Loading from '@/components/common/Loading';
import { useProfileImage } from '@/hooks/useProfileImage';
import UserInfoInputFields from '@/components/mypage/UserInfoInputFields';

const UserInfoEdit: React.FC = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<ProfileData | null>(null);
  const [editedUserInfo, setEditedUserInfo] = useState({
    nickname: '',
    mbti: '',
  });
  const {
    isModalOpen,
    previewImage,
    profileImageFile,
    handleProfileImageChange,
    handleOpenModal,
    handleCloseModal,
    handleSelectPhoto,
    handleDeletePhoto,
  } = useProfileImage(userInfo?.profileImageUrl || null);

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
        handleProfileImageChange(data.profileImageUrl || null);
      } catch (error) {
        console.error('프로필 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    if (!userInfo) return;

    const updatedData: patchProfileData = {};

    if (editedUserInfo.nickname !== userInfo.nickname) {
      updatedData.nickname = editedUserInfo.nickname;
    }

    if (editedUserInfo.mbti !== userInfo.mbti) {
      updatedData.mbti = editedUserInfo.mbti;
    }

    if (profileImageFile) {
      updatedData.profileImage = profileImageFile;
    }

    if (Object.keys(updatedData).length === 0) {
      console.log('변경된 정보 없음. 요청 안 보냄.');
      return;
    }

    try {
      await patchProfileInfo(updatedData);
      console.log('보낸 데이터: ', updatedData);
      alert('프로필 정보가 수정되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('프로필 수정 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }

    if (isLoading) {
      return <Loading />;
    }
  };

  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="회원정보 수정"
      />
      <S.Container>
        <S.ProfileWrapper onClick={handleOpenModal}>
          <S.ProfileImage src={previewImage || ProfileIcon} alt="profile" />
          <S.EditIconWrapper>
            <S.EditIcon src={editIcon} alt="edit-profile" />
          </S.EditIconWrapper>
        </S.ProfileWrapper>

        <UserInfoInputFields
          userInfo={{
            ...userInfo,
            studentNumber: userInfo?.studentNumber ?? 0,
            birthDate: {
              year: userInfo?.birthDate?.year ?? null,
              month: userInfo?.birthDate?.month ?? null,
              day: userInfo?.birthDate?.day ?? null,
            },
          }}
          editedUserInfo={editedUserInfo}
          handleInputChange={handleInputChange}
        />
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

      <ActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        actions={[
          { label: '앨범에서 선택', onClick: handleSelectPhoto },
          {
            label: '기본 이미지로 변경',
            onClick: handleDeletePhoto,
            type: 'delete',
          },
          { label: '닫기', onClick: handleCloseModal },
        ]}
      />
    </div>
  );
};

export default UserInfoEdit;
