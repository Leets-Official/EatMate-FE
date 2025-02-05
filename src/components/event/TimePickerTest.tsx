import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface TimePickerProps {
  label: string;
  onChange: (time: string) => void;
  initialValue?: { date: string; hour: string; minute: string };
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  onChange,
  initialValue,
}) => {
  const dates = ['오늘', '내일', '3일 후'];
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0')
  );
  const minutes = Array.from({ length: 6 }, (_, i) =>
    String(i * 10).padStart(2, '0')
  );

  const [selectedDate, setSelectedDate] = useState(
    initialValue?.date || '오늘'
  );
  const [selectedHour, setSelectedHour] = useState(initialValue?.hour || '12');
  const [selectedMinute, setSelectedMinute] = useState(
    initialValue?.minute || '00'
  );

  const handleScroll = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    items: string[],
    ref: React.RefObject<HTMLUListElement>
  ) => {
    if (ref.current) {
      const index = Math.round(ref.current.scrollTop / 40);
      setter(items[index]);
    }
  };

  const updateTime = () => {
    onChange(`${selectedDate} ${selectedHour}시 ${selectedMinute}분`);
  };

  useEffect(updateTime, [selectedDate, selectedHour, selectedMinute]);

  return (
    <Container>
      <Header>
        <Label>{label}</Label>
        <SelectedTime>{`${selectedDate} ${selectedHour}시 ${selectedMinute}분`}</SelectedTime>
      </Header>
      <PickerWrapper>
        <PickerColumn>
          <PickerList
            ref={(ref) =>
              ref && ref.scrollTo(0, dates.indexOf(selectedDate) * 40)
            }
            onScroll={(e) =>
              handleScroll(setSelectedDate, dates, e.currentTarget)
            }
          >
            {dates.map((date) => (
              <PickerItem
                key={date}
                isSelected={date === selectedDate}
                layout
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {date}
              </PickerItem>
            ))}
          </PickerList>
        </PickerColumn>

        <PickerColumn>
          <PickerList
            ref={(ref) =>
              ref && ref.scrollTo(0, hours.indexOf(selectedHour) * 40)
            }
            onScroll={(e) =>
              handleScroll(setSelectedHour, hours, e.currentTarget)
            }
          >
            {hours.map((hour) => (
              <PickerItem
                key={hour}
                isSelected={hour === selectedHour}
                layout
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {hour}
              </PickerItem>
            ))}
          </PickerList>
        </PickerColumn>

        <PickerColumn>
          <PickerList
            ref={(ref) =>
              ref && ref.scrollTo(0, minutes.indexOf(selectedMinute) * 40)
            }
            onScroll={(e) =>
              handleScroll(setSelectedMinute, minutes, e.currentTarget)
            }
          >
            {minutes.map((minute) => (
              <PickerItem
                key={minute}
                isSelected={minute === selectedMinute}
                layout
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {minute}
              </PickerItem>
            ))}
          </PickerList>
        </PickerColumn>
      </PickerWrapper>
    </Container>
  );
};

export default TimePicker;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const SelectedTime = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: orange;
`;

const PickerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`;

const PickerColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const PickerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  height: 120px;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PickerItem = styled(motion.li)<{ isSelected: boolean }>`
  text-align: center;
  padding: 10px 0;
  font-size: ${({ isSelected }) => (isSelected ? '18px' : '14px')};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  color: ${({ isSelected }) => (isSelected ? 'orange' : 'black')};
  scroll-snap-align: center;
  transition: all 0.3s ease-in-out;
`;
