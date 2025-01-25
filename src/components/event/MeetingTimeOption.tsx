// import React, { useEffect, useState } from 'react';
// import { Label } from '@/components/common/Input/styles';
// import styled from 'styled-components';
// import { flexSpaceBetween } from '@/styles/CommonStyle';

// const SelectedTime = styled.div`
//   color: ${({ theme }) => theme.COLORS.main};
//   font-size: ${({ theme }) => theme.FONT_SIZE.sm};
//   font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
// `;

// export const Container = styled.div`
//   ${flexSpaceBetween}
// `;

// const Wrapper = styled.div`
//   margin: 30px 0;
// `;

// const PickerWrapper = styled.div`
//   display: flex;
//   gap: 16px;
//   width: 100%;
// `;

// const DatePickerWrapper = styled.div`
//   flex: 2;
// `;

// const TimePickerWrapper = styled.div`
//   flex: 1;
// `;

// interface TimeOptionProps {
//   value?: string;
//   onChange?: (value: string) => void;
// }

// const MeetingTimeOption: React.FC<TimeOptionProps> = ({ value, onChange }) => {
//   const now = new Date();
//   const [selectedTime, setSelectedTime] = useState({
//     date: '오늘',
//     hour: '00',
//     minute: '00',
//   });

//   const formattedTime = `${selectedTime.date} ${selectedTime.hour}시 ${selectedTime.minute}분`;

//   useEffect(() => {
//     if (onChange) {
//       // ISO 형식으로 변환하여 상위 컴포넌트에 전달
//       const currentDate = new Date();
//       let formattedDate;

//       if (selectedTime.date === '오늘') {
//         formattedDate = currentDate;
//       } else if (selectedTime.date === '내일') {
//         formattedDate = new Date(
//           currentDate.setDate(currentDate.getDate() + 1)
//         );
//       } else {
//         formattedDate = new Date(
//           currentDate.setDate(parseInt(selectedTime.date, 10))
//         );
//       }

//       formattedDate.setHours(parseInt(selectedTime.hour, 10));
//       formattedDate.setMinutes(parseInt(selectedTime.minute, 10));

//       onChange(formattedDate.toISOString());
//     }
//   }, [selectedTime, onChange]);

//   // 날짜 배열 생성 (오늘 ~ +7일)
//   const createDates = () => {
//     const dates: string[] = [];
//     for (let i = 0; i < 8; i++) {
//       const date = new Date(now);
//       date.setDate(now.getDate() + i);
//       if (i === 0) {
//         dates.push('오늘');
//       } else if (i === 1) {
//         dates.push('내일');
//       } else {
//         dates.push(`${date.getDate()}일`);
//       }
//     }
//     return dates;
//   };

//   // 시간 배열 생성 (0~23시)
//   const createHours = () => {
//     return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
//   };

//   // 분 배열 생성 (10분 단위)
//   const createMinutes = () => {
//     return Array.from({ length: 6 }, (_, i) =>
//       (i * 10).toString().padStart(2, '0')
//     );
//   };

//   const dates = createDates();
//   const hours = createHours();
//   const minutes = createMinutes();

//   const handleTimeChange = (key: keyof typeof selectedTime, value: string) => {
//     setSelectedTime((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <Wrapper>
//       <Container>
//         <Label>약속 시간</Label>
//         <SelectedTime>{formattedTime}</SelectedTime>
//       </Container>
//       <PickerWrapper>
//         <DatePickerWrapper>
//           {/* 날짜 선택 */}
//           <TimePicker
//             options={dates}
//             defaultValue={selectedTime.date}
//             onChange={(value) => handleTimeChange('date', value)}
//             isWide
//           />
//         </DatePickerWrapper>
//         {/* 시간 선택 */}
//         <TimePickerWrapper>
//           <TimePicker
//             options={hours}
//             defaultValue={selectedTime.hour}
//             onChange={(value) => handleTimeChange('hour', value)}
//           />
//         </TimePickerWrapper>
//         {/* 분 선택 */}
//         <TimePickerWrapper>
//           <TimePicker
//             options={minutes}
//             defaultValue={selectedTime.minute}
//             onChange={(value) => handleTimeChange('minute', value)}
//           />
//         </TimePickerWrapper>
//       </PickerWrapper>
//     </Wrapper>
//   );
// };

// export default MeetingTimeOption;
