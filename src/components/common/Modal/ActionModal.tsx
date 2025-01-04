// import * as S from '../Modal/styles';
// interface Action {
//   label: string;
//   onClick: () => void;
// }

// interface ActionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   actions: Action[];
// }

// const ActionModal: React.FC<ActionModalProps> = ({
//   isOpen,
//   onClose,
//   actions,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <S.Overlay onClick={onClose}>
//       <S.Container onClick={(e) => e.stopPropagation()}>
//         {actions.map((action, index) => (
//           <React.Fragment key={index}>
//             <S.ActionButton onClick={action.onClick}>
//               {action.label}
//             </S.ActionButton>
//             {index === 0 && <S.Divider />}
//           </React.Fragment>
//         ))}
//         <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
//       </S.Container>
//     </S.Overlay>
//   );
// };

// export default ActionModal;
