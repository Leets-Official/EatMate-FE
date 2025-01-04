import React from 'react';

interface Action {
  label: string;
  onClick: () => void;
}

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions: Action[];
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  title,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h2 style={styles.title}>{title}</h2>}
        <div style={styles.actions}>
          {actions.map((action, index) => (
            <button key={index} onClick={action.onClick} style={styles.button}>
              {action.label}
            </button>
          ))}
        </div>
        <button onClick={onClose} style={styles.closeButton}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ActionModal;

// 간단한 인라인 스타일
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'relative',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    padding: '10px',
    fontSize: '14px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '15px',
    padding: '10px',
    fontSize: '14px',
    backgroundColor: 'lightgray',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
