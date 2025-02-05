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
import {
  getMeetingDetailApi,
  patchOfflineMeetingApi,
} from '@/apis/meetings/getMeeting';

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
    console.log('meetingId 값: ', meetingId);

    if (location.state?.category) {
      handleChange('offlineMeetingCategory', location.state.category);
    }

    const fetchMeetingData = async () => {
      if (isEditMode && meetingId) {
        try {
          const data = await getMeetingDetailApi(meetingId);
          console.log('불러온 모임 데이터:', data);
          setFormData((prev) => ({
            meetingName: data.meetingName,
            meetingDescription: data.meetingDescription,
            meetingPlace: data.location,
            meetingDate: formatMeetingDate(data.dueDateTime),
            offlineMeetingCategory:
              data.offlineMeetingCategory || prev.offlineMeetingCategory,
            backgroundImage: data.backgroundImage,
          }));
        } catch (error) {
          console.error('모임 정보를 불러오는 중 오류 발생:', error);
        }
      } else {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
      }
    };

    fetchMeetingData();
  }, [isEditMode, meetingId, location.state?.category]);

  useEffect(() => {
    console.log('업데이트된 formData:', formData);
  }, [formData]);

  const handleFormChange = (key: string, value: any) => {
    handleChange(key, value);

    // isLimited가 false이면 maxParticipants를 null 로 설정
    if (key === 'isLimited' && !value) {
      handleChange('maxParticipants', 10);
    }
  };

  const buildFormData = (): OfflineMeetingFormData => {
    const baseFormData = {
      meetingName: formData.meetingName,
      meetingDescription: formData.meetingDescription,
      meetingPlace: formData.meetingPlace,
      meetingDate: formatMeetingDate(formData.meetingDate),
      offlineMeetingCategory: formData.offlineMeetingCategory,
      backgroundImage: formData.backgroundImage,
    };

    // 모임 생성 시 모든 필드 포함
    if (!isEditMode) {
      return {
        ...baseFormData,
        isLimited: formData.isLimited,
        maxParticipants: formData.maxParticipants,
        genderRestriction: formData.genderRestriction,
      };
    }

    // 모임 수정 시 일부 필드 제거
    return baseFormData;
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'meetingName',
      'meetingDescription',
      'meetingPlace',
      'offlineMeetingCategory',
    ];

    if (!isEditMode) {
      requiredFields.push('genderRestriction');
    }

    if (validateForm(requiredFields)) {
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
              value={formData[field.key] || ''}
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
          disabled={isEditMode}
        />

        <ParticipantOption
          onChange={(isLimited, maxParticipants) => {
            handleFormChange('isLimited', isLimited);
            handleFormChange('maxParticipants', maxParticipants);
          }}
          disabled={isEditMode}
        />

        <S.WheelPickerContainer>
          <TimePicker
            label="약속 시간"
            onChange={(value) => handleFormChange('meetingDate', value)}
            initialValue={isEditMode ? formData.meetingDate : undefined}
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
                value={formData[field.key] || ''}
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
