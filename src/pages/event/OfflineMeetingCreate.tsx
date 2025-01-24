import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { Input } from '@/components/common/Input/Input';
import InputGuide from '@/components/common/Input/InputGuide';
import BackgroundOption from '@/components/event/BackgroundOption';
import GenderOption from '@/components/event/GenderOption';
import ParticipantOption from '@/components/event/ParticipantOption';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useInputHandler } from '@/hooks/useInputHandler';
import WheelPicker from '@/components/event/WheelPicker';
import {
  createOfflineMeeting,
  OfflineMeetingFormData,
} from '@/apis/meetings/createOfflineMeeting';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useUserGender } from '@/hooks/useUserGender';
import { offlineMeetingFormFields } from '@/constants/MeetingFields';
import { formatMeetingDate } from '@/utils/dateUtils';

const ContentPadding = styled.div`
  padding: 20px 30px;
`;

const WheelPickerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const OfflineMeetingCreate: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();

  const userGender = useUserGender();

  const { formData, errors, handleChange, validateForm } = useInputHandler({
    meetingName: '',
    meetingDescription: '',
    isLimited: false,
    maxParticipants: null,
    meetingPlace: '',
    meetingDate: '',
    genderRestriction: '',
    offlineMeetingCategory: '',
    backgroundImage: null as File | string | null,
  });

  useEffect(() => {
    console.log('location 값: ', location);
    if (location.state?.category) {
      handleChange('offlineMeetingCategory', location.state.category);
    }
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

  const updateFormData = (): OfflineMeetingFormData => ({
    meetingName: formData.meetingName,
    meetingDescription: formData.meetingDescription,
    genderRestriction: formData.genderRestriction,
    isLimited: formData.isLimited,
    maxParticipants: formData.isLimited ? formData.maxParticipants : null,
    meetingPlace: formData.meetingPlace,
    meetingDate: formatMeetingDate(formData.meetingDate),
    offlineMeetingCategory: formData.offlineMeetingCategory,
    backgroundImage: formData.backgroundImage,
  });

  const handleSubmit = async () => {
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
        const formDataToSend: OfflineMeetingFormData = updateFormData();
        console.log('모임생성 데이터: ', formDataToSend);

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
        {offlineMeetingFormFields.map((field) =>
          field.key !== 'meetingPlace' ? (
            <Input
              key={field.key}
              label={field.label}
              as={field.as}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              rows={field.rows}
              hasError={errors[field.key]}
              onChange={(e) => handleFormChange(field.key, e.target.value)}
            />
          ) : null
        )}

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

        <WheelPickerContainer>
          <WheelPicker
            onChange={(value) => handleFormChange('meetingDate', value)}
          />
        </WheelPickerContainer>

        {offlineMeetingFormFields.map(
          (field) =>
            field.key === 'meetingPlace' && (
              <Input
                key={field.key}
                label={field.label}
                as={field.as}
                placeholder={field.placeholder}
                guideMessage={field.guideMessage}
                hasError={errors[field.key]}
                errorMessage={field.errorMessage}
                onChange={(e) => handleFormChange(field.key, e.target.value)}
              />
            )
        )}

        <Button variant="primary" size="lg" rounded="md" onClick={handleSubmit}>
          모임 만들기
        </Button>
      </ContentPadding>
    </div>
  );
};

export default OfflineMeetingCreate;
