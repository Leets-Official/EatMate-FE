import { Input } from '@/components/common/Input/Input';
import { InputWrapper } from '@/components/common/Input/styles';
import * as S from '@/styles/mypage/userInfoEdit.styled';
import googleIcon from '@/assets/images/GoogleIcon.svg';

interface UserInfoInputFieldsProps {
  userInfo: {
    email?: string | null;
    studentNumber?: number;
    phoneNumber?: string;
    birthDate?: {
      year?: number | null;
      month?: number | null;
      day?: number | null;
    };
  };
  editedUserInfo: {
    nickname: string;
    mbti: string;
  };
  handleInputChange: (
    field: 'nickname' | 'mbti',
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const UserInfoInputField: React.FC<UserInfoInputFieldsProps> = ({
  userInfo,
  editedUserInfo,
  handleInputChange,
}) => {
  const inputFields = [
    {
      label: '아이디',
      value: userInfo?.email || '',
      readOnly: true,
      marginBottom: '-10px',
      extra: (
        <S.GoogleText>
          <S.GoogleIcon src={googleIcon} alt="google" />
          <div>구글 로그인 사용중</div>
        </S.GoogleText>
      ),
    },
    {
      label: '닉네임',
      value: editedUserInfo.nickname,
      readOnly: false,
      marginBottom: '-30px',
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleInputChange('nickname', e),
    },
    {
      label: '학번',
      value: userInfo?.studentNumber || '',
      readOnly: true,
      marginBottom: '-30px',
    },
    {
      label: '전화번호',
      value: userInfo?.phoneNumber || '',
      readOnly: true,
      marginBottom: '-30px',
    },
    {
      label: 'MBTI',
      value: editedUserInfo.mbti,
      readOnly: false,
      marginBottom: '-30px',
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleInputChange('mbti', e),
    },
    {
      label: '생년월일',
      value: userInfo?.birthDate?.year
        ? `${userInfo.birthDate.year}.${userInfo.birthDate.month}.${userInfo.birthDate.day}`
        : '정보 없음',
      readOnly: true,
      marginBottom: '0px',
    },
  ];

  return (
    <S.FormContainer>
      {inputFields.map((field, index) => (
        <InputWrapper key={index} marginBottom={field.marginBottom}>
          <Input
            label={field.label}
            value={field.value}
            readOnly={field.readOnly}
            keepBackground
            onChange={field.onChange}
          />
          {field.extra && field.extra}
        </InputWrapper>
      ))}
    </S.FormContainer>
  );
};

export default UserInfoInputField;
