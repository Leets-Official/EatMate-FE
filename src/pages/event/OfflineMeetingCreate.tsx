import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import * as S from '@/styles/event/MeetingCreate.styled';
import { Input } from '@/components/common/Input/Input';
import InputGuide from '@/components/common/Input/InputGuide';
import BackgroundOption from '@/components/event/BackgroundOption';
import GenderOption from '@/components/event/GenderOption';
import ParticipantOption from '@/components/event/ParticipantOption';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useInputHandler } from '@/hooks/useInputHandler';
import {
  createOfflineMeeting,
  OfflineMeetingFormData,
} from '@/apis/meetings/createMeeting';
import { useEffect } from 'react';
import { useUserGender } from '@/hooks/useUserGender';
import { offlineMeetingFormFields } from '@/constants/MeetingFieldsConstants';
import { formatMeetingDate } from '@/utils/dateUtils';
import TimePicker from '@/components/event/TimePicker';
import { patchOfflineMeetingApi } from '@/apis/meetings/getMeeting';

const OfflineMeetingCreate: React.FC = () => {
  const nav = useNavigate();
  const userGender = useUserGender();
  const location = useLocation();

  const { meetingId } = useParams(); // 모임 수정 모드인지 확인
  const isEditMode = Boolean(meetingId); // 모임 수정 모드 여부

  const { formData, errors, handleChange, validateForm, setFormData } =
    useInputHandler({
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
    if (isEditMode && location.state?.meetingData) {
      const meeting = location.state.meetingData;
      setFormData({
        meetingName: meeting.meetingName,
        meetingDescription: meeting.meetingDescription,
        isLimited: meeting.isLimited,
        maxParticipants: meeting.maxParticipants ?? 10, // null이면 기본값 10
        meetingPlace: meeting.meetingPlace,
        meetingDate: meeting.meetingDate,
        genderRestriction: meeting.genderRestriction,
        offlineMeetingCategory: meeting.offlineMeetingCategory,
        backgroundImage: meeting.backgroundImage,
      });
    }
  }, [isEditMode, location.state?.meetingData]);

  const handleFormChange = (key: string, value: any) => {
    handleChange(key, value);

    // isLimited가 false이면 maxParticipants를 null 로 설정
    if (key === 'isLimited' && !value) {
      handleChange('maxParticipants', 10);
    }
  };

  const buildFormData = (): OfflineMeetingFormData => ({
    meetingName: formData.meetingName,
    meetingDescription: formData.meetingDescription,
    genderRestriction: formData.genderRestriction,
    isLimited: formData.isLimited,
    maxParticipants: formData.isLimited ? formData.maxParticipants : 10,
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
        const formDataToSend: OfflineMeetingFormData = buildFormData();
        console.log('모임 데이터: ', formDataToSend);
        if (isEditMode) {
          await patchOfflineMeetingApi(meetingId!, formDataToSend);
          alert('오프라인 모임이 수정되었습니다.');
        } else {
          await createOfflineMeeting(formDataToSend);
          alert('오프라인 모임이 생성되었습니다.');
        }
        nav('/home');
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : '오류가 발생했습니다: '
        );
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
        title={isEditMode ? '모임 수정하기' : '모임 만들기'}
      />
      <S.ContentPadding>
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

        <ParticipantOption
          onChange={(isLimited, maxParticipants) => {
            handleFormChange('isLimited', isLimited);
            handleFormChange('maxParticipants', maxParticipants);
          }}
        />

        <S.WheelPickerContainer>
          <TimePicker
            label="약속 시간"
            onChange={(value) => handleFormChange('meetingDate', value)}
          />
        </S.WheelPickerContainer>

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
          {isEditMode ? '모임 수정하기' : '모임 만들기'}
        </Button>
      </S.ContentPadding>
    </div>
  );
};

export default OfflineMeetingCreate;
