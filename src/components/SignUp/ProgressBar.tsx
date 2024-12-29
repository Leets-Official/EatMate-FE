import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #d9d9d9;
  border-radius: 4px;
  margin: 1rem 0;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.COLORS.primary.main};
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressBarComponent: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBar progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBarComponent;
