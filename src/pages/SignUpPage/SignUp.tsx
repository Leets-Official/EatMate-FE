import { useRecoilState } from 'recoil';
import { userNameState } from '../../recoil/atoms/userAtom';

const SignUp = () => {
  const [userName, setUserName] = useRecoilState(userNameState);

  return (
    <div>
      안녕하세요 {userName} 님
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
};
export default SignUp;
