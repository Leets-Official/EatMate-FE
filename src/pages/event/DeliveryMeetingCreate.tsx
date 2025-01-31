import Header from '@/components/common/Header/Header';
import { useUserGender } from '@/hooks/useUserGender';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/event/MeetingCreate.styled';
import Button from '@/components/common/Button/Button';
import { deliveryMeetingFormFields } from '@/constants/MeetingFieldsConstants';
import { Input } from '@/components/common/Input/Input';
import BackgroundOption from '@/components/event/BackgroundOption';
import { useInputHandler } from '@/hooks/useInputHandler';
import InputGuide from '@/components/common/Input/InputGuide';
import GenderOption from '@/components/event/GenderOption';
import ParticipantOption from '@/components/event/ParticipantOption';
import MenuCategoryOption from '@/components/event/MenuCategoryOption';
import TimePicker from '@/components/event/TimePicker';
import BankSelectModal from '@/components/common/Modal/BankSelectModal';
import { useState } from 'react';
import {
  createDeliveryMeeting,
  DeliveryMeetingFormData,
} from '@/apis/meetings/createMeeting';
import { extractMinutes } from '@/utils/dateUtils';

const DeliveryMeetingCreate: React.FC = () => {
  const nav = useNavigate();
  const userGender = useUserGender();
  const [selectedBank, setSelectedBank] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    handleFormChange('bankName', bank);
    setIsModalOpen(false);
  };

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

  const buildFormData = (): DeliveryMeetingFormData => ({
    meetingName: formData.meetingName,
    meetingDescription: formData.meetingDescription,
    genderRestriction: formData.genderRestriction,
    isLimited: formData.isLimited,
    maxParticipants: formData.isLimited ? formData.maxParticipants : null,
    foodCategory: formData.foodCategory,
    storeName: formData.storeName,
    pickupLocation: formData.pickupLocation,
    orderDeadline: extractMinutes(formData.orderDeadline),
    accountNumber: formData.accountNumber,
    bankName: formData.bankName,
    backgroundImage: formData.backgroundImage,
  });

  const handleSubmit = async () => {
    if (
      validateForm([
        'meetingName',
        'meetingDescription',
        'genderRestriction',
        'storeName',
        'pickupLocation',
        'orderDeadline',
        'accountNumber',
        'bankName',
        'foodCategory',
      ])
    ) {
      try {
        const formDataToSend: DeliveryMeetingFormData = buildFormData();
        await createDeliveryMeeting(formDataToSend);
        window.alert('배달팟 모임이 생성되었습니다.');
        console.log('배달팟이 정상적으로 생성되었습니다.');
        console.log('배달팟 생성 데이터:', formDataToSend);
        nav('/home');
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : '오류가 발생했습니다.'
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
              hasError={errors[field.key]}
              onChange={(e) => handleFormChange(field.key, e.target.value)}
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

        <MenuCategoryOption
          onCategorySelect={(value) => handleFormChange('foodCategory', value)}
          showError={!!errors.foodCategory}
        />

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
              hasError={errors[field.key]}
              onChange={(e) => handleFormChange(field.key, e.target.value)}
            />
          ))}
        <Input
          placeholder="은행 선택"
          value={selectedBank}
          isBankInput
          onClick={() => setIsModalOpen(true)}
          hasError={errors.bankName}
          readOnly
          keepBackground={false}
        />

        {isModalOpen && (
          <BankSelectModal
            onSelect={handleBankSelect}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        <TimePicker
          label="주문 마감 시간"
          showDatePicker={false}
          additionalText="분 뒤 주문 접수가 종료돼요"
          onChange={(value) => handleFormChange('orderDeadline', value)}
        />

        <Button variant="primary" size="lg" rounded="md" onClick={handleSubmit}>
          배달팟 만들기
        </Button>
      </S.ContentPadding>
    </div>
  );
};

export default DeliveryMeetingCreate;
