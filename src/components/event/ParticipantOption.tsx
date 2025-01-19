import { Label } from '@/components/common/Input/styles';
import RangeSlider from '@/components/common/RangeSlider';

const ParticipantOption: React.FC = () => {
  return (
    <>
      <Label>인원 제한</Label>
      <RangeSlider isOpen isColor={false} />
    </>
  );
};

export default ParticipantOption;
