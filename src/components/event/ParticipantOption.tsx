import { Label } from '@/components/common/Input/styles';
import RangeSlider from '@/components/common/RangeSlider';

interface ParticipantOptionProps {
  onChange: (isLimited: boolean, maxParticipants: number | null) => void;
}

const ParticipantOption: React.FC<ParticipantOptionProps> = ({ onChange }) => {
  const handleRangeChange = (label: string) => {
    if (label === '상관없음') {
      onChange(false, null);
    } else {
      const numbers = label.match(/\d+/g);
      if (numbers && numbers.length === 2) {
        const max = Number(numbers[1]);
        onChange(true, max);
      }
    }
  };

  return (
    <>
      <Label>인원 제한</Label>
      <RangeSlider isColor={false} onLabelChange={handleRangeChange} />
    </>
  );
};

export default ParticipantOption;
