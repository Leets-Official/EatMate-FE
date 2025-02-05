export type InputType = 'input' | 'textarea';

export interface FormField {
  key: string;
  label: string;
  placeholder: string;
  maxLength?: number;
  as: InputType;
  rows?: number;
  guideMessage?: string | string[];
  errorMessage?: string;
  hasError?: boolean;
}

export const offlineMeetingFormFields: FormField[] = [
  {
    key: 'meetingName',
    label: '모임 제목',
    placeholder: '30자 이내',
    maxLength: 30,
    as: 'textarea',
  },
  {
    key: 'meetingDescription',
    label: '모임 설명',
    placeholder: '무엇을 하는 어떤 모임인가요? 100자 이내',
    maxLength: 100,
    rows: 4,
    as: 'textarea',
  },
  {
    key: 'meetingPlace',
    label: '가게 이름',
    placeholder: '가게명 입력',
    guideMessage: '가게명과 지점명을 함께 입력해주세요  EX) 요아정 가천대점',
    as: 'input',
    errorMessage: '다시 입력해주세요.',
  },
];

export const deliveryMeetingFormFields: FormField[] = [
  {
    key: 'meetingName',
    label: '모임 제목',
    placeholder: '30자 이내',
    maxLength: 30,
    as: 'textarea',
  },
  {
    key: 'meetingDescription',
    label: '배달팟 설명',
    placeholder: '몇 분동안 어떤 음식을 주문하는 모임인가요? 100자 이내',
    maxLength: 100,
    rows: 4,
    as: 'textarea',
  },
  {
    key: 'storeName',
    label: '가게 이름',
    placeholder: '가게명 입력',
    guideMessage: [
      '가게명과 지점명을 함께 입력해주세요',
      'EX) 요아정 가천대점',
    ],
    as: 'input',
    errorMessage: '다시 입력해주세요.',
  },
  {
    key: 'pickupLocation',
    label: '픽업 장소',
    placeholder: '자세하게 작성해주세요',
    guideMessage: [
      '모두가 아는 알기 쉬운 장소로 픽해주세요',
      'EX) AI공학관 2층 로비',
    ],
    as: 'input',
    errorMessage: '다시 입력해주세요.',
  },
  {
    key: 'accountNumber',
    label: '계좌 번호',
    placeholder: '계좌번호를 입력해주세요',
    as: 'input',
    errorMessage: '다시 입력해주세요.',
  },
];
