const ProgressBarComponent: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBar progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBarComponent;
