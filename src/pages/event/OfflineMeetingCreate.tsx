import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { Input } from '@/components/common/Input/Input';
import InputGuide from '@/components/common/Input/InputGuide';
import BackgroundOption from '@/components/event/BackgroundOption';
import GenderOption from '@/components/event/GenderOption';
import ParticipantOption from '@/components/event/ParticipantOption';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MeetingTimeOption from '@/components/event/MeetingTimeOption';
import { useInputHandler } from '@/hooks/useInputHandler';

const ContentPadding = styled.div`
  padding: 20px 30px;
`;

const OfflineMeetingCreate: React.FC = () => {
  const nav = useNavigate();

  // const [genderSelected, setGenderSelected] = useState<boolean>(false);
  // const [errors, setErrors] = useState<{
  //   gender?: Boolean;
  //   storeName?: boolean;
  // }>({});
  // const [storeName, setStoreName] = useState('');

  // const handleGenderChange = (value: string) => {
  //   setGenderSelected(true);
  //   setErrors((prev) => ({ ...prev, gender: false }));
  //   console.log('선택된 성별 제한:', value);
  // };

  // const validateForm = () => {
  //   const newErrors: { gender?: boolean; storeName?: boolean } = {};
  //   if (!storeName.trim()) newErrors.storeName = true;
  //   if (!genderSelected) newErrors.gender = true;

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     console.log('모임이 정상적으로 생성되었습니다.');
  //   }
  // };

  const { formData, errors, handleChange, validateForm } = useInputHandler({
    meetingName: '',
    meetingDescription: '',
    isLimited: false,
    maxParticipants: null,
    meetingPlace: '',
    meetingDate: '',
    // gender:''
    // offlineMeetingCategory: ""
  });

  const handleFormChange = (key: string, value: any) => {
    handleChange(key, value);

    // isLimited가 false이면 maxParticipants를 null 로 설정
    if (key === 'isLimited' && !value) {
      handleChange('maxParticipants', null);
    }
  };

  const handleSubmit = () => {
    if (validateForm(['meetingName', 'meetingDescription', 'meetingPlace'])) {
      console.log('오프라인 모임이 정상적으로 생성되었습니다.', formData);
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

        <BackgroundOption />
        <InputGuide
          message="모임 배경 화면에 들어갈 사진을 골라주세요."
          margin="15px"
        />

        <GenderOption
          // onChange={(e) => handleFormChange('gender', e.target.value)}
          showError={!!errors.gender}
        />
        <ParticipantOption
          onChange={(value) => handleFormChange('isLimited', value)}
        />
        <MeetingTimeOption
          value={formData.meetingDate}
          onChange={(value) => handleFormChange('meetingDate', value)}
        />
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
