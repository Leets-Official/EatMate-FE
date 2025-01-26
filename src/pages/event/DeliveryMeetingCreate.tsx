import Header from '@/components/common/Header/Header';
import { useUserGender } from '@/hooks/useUserGender';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/event/MeetingCreate.styled';
import Button from '@/components/common/Button/Button';
import { deliveryMeetingFormFields } from '@/constants/MeetingFields';
import { Input } from '@/components/common/Input/Input';
import BackgroundOption from '@/components/event/BackgroundOption';
import { useInputHandler } from '@/hooks/useInputHandler';
import InputGuide from '@/components/common/Input/InputGuide';
import GenderOption from '@/components/event/GenderOption';
import ParticipantOption from '@/components/event/ParticipantOption';
import MenuCategoryOption from '@/components/event/MenuCategoryOption';
import TimePicker from '@/components/event/TimePicker';

const DeliveryMeetingCreate: React.FC = () => {
  const nav = useNavigate();
  const userGender = useUserGender();

  const { formData, errors, handleChange, validateForm } = useInputHandler({
    meetingName: '',
    meetingDescription: '',
    genderRestriction: '',
    isLimited: false,
    maxParticipants: null,
    foodCategory: '',
    storeName: '',
    pickupLocation: '',
    orderDeadline: '',
    accountNumber: '',
    bankName: '',
    backgroundImage: null as File | string | null,
  });

  const handleFormChange = (key: string, value: any) => {
    handleChange(key, value);

    // isLimited가 false이면 maxParticipants를 null 로 설정
    if (key === 'isLimited' && !value) {
      handleChange('maxParticipants', null);
    }
  };

  return (
    <div>
      <Header
        onBackClick={() => {
          nav(-1);
        }}
        showBackButton
        title="배달팟 만들기"
      />
      <S.ContentPadding>
        {deliveryMeetingFormFields
          .filter((field) => field.key.startsWith('meeting'))
          .map((field) => (
            <Input
              key={field.key}
              label={field.label}
              as={field.as}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              rows={field.rows}
              // hasError={errors[field.key]}
              // onChange={(e) => handleFormChange(field.key, e.target.value)}
            />
          ))}
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

        <MenuCategoryOption />

        {deliveryMeetingFormFields
          .filter((field) => !field.key.startsWith('meeting'))
          .map((field) => (
            <Input
              key={field.key}
              label={field.label}
              as={field.as}
              guideMessage={
                Array.isArray(field.guideMessage)
                  ? field.guideMessage.map((msg, idx) => <p key={idx}>{msg}</p>)
                  : field.guideMessage
              }
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              rows={field.rows}
              // hasError={errors[field.key]}
              // onChange={(e) => handleFormChange(field.key, e.target.value)}
            />
          ))}

        <TimePicker
          label="주문 마감 시간"
          showDatePicker={false}
          additionalText="분 뒤 주문 접수가 종료돼요"
          onChange={handleFormChange}
        />
        <Button variant="primary" size="lg" rounded="md">
          배달팟 만들기
        </Button>
      </S.ContentPadding>
    </div>
  );
};

export default DeliveryMeetingCreate;
