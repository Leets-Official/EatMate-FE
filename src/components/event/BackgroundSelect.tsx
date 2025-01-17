import defaultBgImg1 from '@/assets/images/ic_backimg_main.svg';
import defaultBgImg2 from '@/assets/images/ic_backImg_moohan.svg';

const BackgroundSelect: React.FC = () => {
  const backImgs = [
    { id: 1, src: defaultBgImg1 },
    { id: 2, src: defaultBgImg2 },
  ];

  const handleSelect = (id: number) => {
    setSelectId(Id);
  };
  
  return <div></div>;
};

export default BackgroundSelect;
