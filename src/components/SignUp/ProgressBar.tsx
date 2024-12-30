import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 330px;
  height: 8px;
  background-color: #d9d9d9;
  border-radius: 4px;
  /* padding: 0 16px; */
  /* margin: 1rem 0; */
  margin: 1rem auto;
`;

export const StyledProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.COLORS.main};
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <StyledProgressBar progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
