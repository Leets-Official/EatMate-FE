import Header from '@/components/common/Header/Header';
import { useUserGender } from '@/hooks/useUserGender';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import {
  createDeliveryMeeting,
  DeliveryMeetingFormData,
  patchDeliveryMeetingApi,
} from '@/apis/meetings/createMeeting';
import { extractMinutes } from '@/utils/dateUtils';
import { getMeetingDetailApi } from '@/apis/meetings/getMeeting';
// import { differenceInMinutes, parseISO } from 'date-fns';

const DeliveryMeetingCreate: React.FC = () => {
  const nav = useNavigate();
  const userGender = useUserGender();
  const [selectedBank, setSelectedBank] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { meetingId } = useParams(); // 모임 수정 모드인지 확인
  const isEditMode = Boolean(meetingId); // 모임 수정 모드 여부

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    handleFormChange('bankName', bank);
    setIsModalOpen(false);
  };

  const { formData, errors, handleChange, validateForm, setFormData } =
    useInputHandler({
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

  useEffect(() => {
    if (isEditMode && meetingId) {
      const fetchMeetingData = async () => {
        try {
          const data = await getMeetingDetailApi(meetingId);
          console.log('불러온 배달팟 데이터:', data);

          // const remainingMinutes = differenceInMinutes(
          //   parseISO(data.dueDateTime),
          //   new Date()
          // );

          setFormData((prev) => ({
            ...prev,
            meetingName: data.meetingName,
            meetingDescription: data.meetingDescription,
            storeName: data.storeName,
            pickupLocation: data.location,
            orderDeadline: data.dueDateTime,
            accountNumber: data.accountNumber,
            bankName: data.bankName,
            foodCategory: data.foodCategory,
            backgroundImage: data.backgroundImage,
            backgroundImageType: data.backgroundImageType || 'DEFAULT_IMAGE_1',
          }));
          setSelectedBank(data.bankName || '');
        } catch (error) {
          console.error('배달팟 정보를 불러오는 중 오류 발생:', error);
        }
      };

      fetchMeetingData();
    }
  }, [isEditMode, meetingId]);

  const handleFormChange = (
    key: string,
    value: any,
    backgroundImageType?: string
  ) => {
    handleChange(key, value);

    if (key === 'isLimited' && !value) {
      handleChange('maxParticipants', 10);
    }
    if (key === 'backgroundImage') {
      handleChange('backgroundImage', value);
      handleChange('backgroundImageType', backgroundImageType || 'CUSTOM');
    }
  };

  const buildFormData = (): DeliveryMeetingFormData => {
    const baseFormData = {
      meetingName: formData.meetingName,
      meetingDescription: formData.meetingDescription,
      genderRestriction: formData.genderRestriction,
      isLimited: formData.isLimited,
      maxParticipants: formData.isLimited ? formData.maxParticipants : 10,
      foodCategory: formData.foodCategory,
      storeName: formData.storeName,
      pickupLocation: formData.pickupLocation,
      // orderDeadline:
      //   typeof formData.orderDeadline === 'number'
      //     ? formatOrderDeadline(formData.orderDeadline)
      //     : formData.orderDeadline,
      orderDeadline: extractMinutes(formData.orderDeadline),
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
      backgroundImageType: formData.backgroundImageType,
      backgroundImage:
        formData.backgroundImageType === 'CUSTOM'
          ? formData.backgroundImage
          : null,
    };

    if (formData.backgroundImageType === 'CUSTOM' && formData.backgroundImage) {
      baseFormData.backgroundImage = formData.backgroundImage;
    }

    return baseFormData;
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'meetingName',
      'meetingDescription',
      'storeName',
      'pickupLocation',
      'orderDeadline',
      'accountNumber',
      'bankName',
      'foodCategory',
    ];

    if (!isEditMode) {
      requiredFields.push('genderRestriction');
    }

    if (validateForm(requiredFields)) {
      try {
        const formDataToSend: DeliveryMeetingFormData = buildFormData();
        console.log('배달팟 데이터:', formDataToSend);

        if (isEditMode) {
          await patchDeliveryMeetingApi(meetingId!, formDataToSend);
          alert('배달팟이 수정되었습니다.');
        } else {
          await createDeliveryMeeting(formDataToSend);
          alert('배달팟이 생성되었습니다.');
        }

        nav('/home');
      } catch (error) {
        console.error(error instanceof Error ? error.message : '오류 발생');
      }
    } else {
      console.log('필수 입력값이 누락되었습니다.');
    }
  };
  return (
    <div>
      <Header
        showBackButton
        title={isEditMode ? '배달팟 수정하기' : '배달팟 만들기'}
      />
      <S.ContentPadding>
        {deliveryMeetingFormFields
          .filter((field) => field.key.startsWith('meeting'))
          .map((field) => (
            <Input
              key={field.key}
              label={field.label}
              as={field.as}
              value={formData[field.key] || ''}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              rows={field.rows}
              hasError={errors[field.key]}
              onChange={(e) => handleFormChange(field.key, e.target.value)}
            />
          ))}
        <BackgroundOption
          onChange={(key, value, backgroundImageType) => {
            handleFormChange(key, value);
            handleFormChange('backgroundImageType', backgroundImageType);
          }}
        />

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
              value={formData[field.key] || ''}
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
          {isEditMode ? '배달팟 수정하기' : '배달팟 만들기'}
        </Button>
      </S.ContentPadding>
    </div>
  );
};

export default DeliveryMeetingCreate;
