import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { Input } from '@/components/common/Input/Input';
import InputGuide from '@/components/common/Input/InputGuide';
import BackgroundOption from '@/components/event/BackgroundOption';
import GenderOption from '@/components/event/GenderOption';
import ParticipantOption from '@/components/event/ParticipantOption';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import MeetingTimeOption from '@/components/event/MeetingTimeOption';
import { useInputHandler } from '@/hooks/useInputHandler';

import WheelPicker from '@/components/event/WheelPicker';
import {
  createOfflineMeeting,
  OfflineMeetingFormData,
} from '@/apis/meetings/createOfflineMeeting';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/apis/auth/auth';

const ContentPadding = styled.div`
  padding: 20px 30px;
`;

const OfflineMeetingCreate: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [userGender, setUserGender] = useState<string | null>(null);

  const { formData, errors, handleChange, validateForm } = useInputHandler({
    meetingName: '',
    meetingDescription: '',
    isLimited: false,
    maxParticipants: null,
    meetingPlace: '',
    meetingDate: '',
    genderRestriction: '',
    offlineMeetingCategory: '',
    backgroundImage: null as File | null,
  });

  useEffect(() => {
    console.log('location 값: ', location);
    if (location.state?.category) {
      handleChange('offlineMeetingCategory', location.state.category);
    }

    const fetchUserGender = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          console.log('사용자의 성별 정보: ', userInfo.gender);
          setUserGender(userInfo.gender);
        }
      } catch (error) {
        console.error('사용자 성별을 가져오는 중 오류 발생: ', error);
      }
    };

    fetchUserGender();
  }, [location.state?.category]);

  const handleFormChange = (key: string, value: any) => {
    handleChange(key, value);

    // isLimited가 false이면 maxParticipants를 null 로 설정
    if (key === 'isLimited' && !value) {
      handleChange('maxParticipants', null);
    }
  };

  const handleParticipantChange = (
    isLimited: boolean,
    maxParticipants: number | null
  ) => {
    handleChange('isLimited', isLimited);
    handleChange('maxParticipants', maxParticipants);
  };

  const handleSubmit = async () => {
    console.log('모임생성 데이터: ', formData);
    if (
      validateForm([
        'meetingName',
        'meetingDescription',
        'meetingPlace',
        'offlineMeetingCategory',
        'genderRestriction',
      ])
    ) {
      try {
        const formDataToSend: OfflineMeetingFormData = {
          meetingName: formData.meetingName,
          meetingDescription: formData.meetingDescription,
          genderRestriction: formData.genderRestriction,
          isLimited: formData.isLimited,
          maxParticipants: formData.isLimited ? formData.maxParticipants : null,
          meetingPlace: formData.meetingPlace,
          meetingDate: formData.meetingDate,
          offlineMeetingCategory: formData.offlineMeetingCategory,
          backgroundImage: formData.backgroundImage, // 이미 null 허용된 상태
        };
        const response = await createOfflineMeeting(formDataToSend);
        console.log('오프라인 모임이 정상적으로 생성되었습니다.', response);
        nav('/home');
      } catch (error) {
        console.error('오프라인 모임 생성중 오류 발생: ', error);
      }
    } else {
      console.log('필수 입력값이 누락되었습니다.');
    }
  };

  return (
    <div>
      <Header
        onBackClick={() => {
          nav(-1);
        }}
        showBackButton
        title="모임 만들기"
      />
      <ContentPadding>
        <Input
          label="모임 제목"
          as="textarea"
          placeholder="30자 이내"
          maxLength={30}
          onChange={(e) => handleFormChange('meetingName', e.target.value)}
          hasError={errors.meetingName}
        />
        <Input
          label="모임 설명"
          as="textarea"
          placeholder="무엇을 하는 어떤 모임인가요?  100자 이내"
          maxLength={100}
          rows={4}
          onChange={(e) =>
            handleFormChange('meetingDescription', e.target.value)
          }
          hasError={errors.meetingDescription}
        />

        <BackgroundOption onChange={handleFormChange} />
        <InputGuide
          message="모임 배경 화면에 들어갈 사진을 골라주세요."
          margin="15px"
        />

        <GenderOption
          userGender={(userGender as 'MALE' | 'FEMALE') || 'MALE'}
          onChange={(value) => handleFormChange('genderRestriction', value)}
          showError={!!errors.genderRestriction}
        />
        <ParticipantOption onChange={handleParticipantChange} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <WheelPicker
            onChange={(value) => handleFormChange('meetingDate', value)}
          />
        </div>
        <div>
          <Input
            label="가게 이름"
            as="input"
            placeholder="가게명 입력"
            guideMessage="가게명과 지점명을 함께 입력해주세요"
            onChange={(e) => handleFormChange('meetingPlace', e.target.value)}
            hasError={errors.meetingPlace}
            errorMessage="다시 입력해주세요."
          />
        </div>
        <Button variant="primary" size="lg" rounded="md" onClick={handleSubmit}>
          모임 만들기
        </Button>
      </ContentPadding>
    </div>
  );
};

export default OfflineMeetingCreate;
