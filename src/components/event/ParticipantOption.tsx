import { Label } from '@/components/common/Input/styles';
import RangeSlider from '@/components/common/RangeSlider';
import styled from 'styled-components';

export const DisabledContainer = styled.div`
  pointer-events: none;
  opacity: 0.5;
`;

interface ParticipantOptionProps {
  onChange: (isLimited: boolean, maxParticipants: number | null) => void;
  disabled?: boolean;
}

const ParticipantOption: React.FC<ParticipantOptionProps> = ({
  onChange,
  disabled = false,
}) => {
  const handleRangeChange = (label: string) => {
    if (disabled) return;

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
      {disabled ? (
        <DisabledContainer>
          <RangeSlider isColor={false} onLabelChange={handleRangeChange} />
        </DisabledContainer>
      ) : (
        <RangeSlider isColor={false} onLabelChange={handleRangeChange} />
      )}
    </>
  );
};

export default ParticipantOption;
