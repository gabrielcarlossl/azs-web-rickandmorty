import React from 'react'
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ButtonStyled from './style/ButtonStyled';

type BackButtonProps = {
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  text = 'Voltar'
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ButtonStyled
      onClick={handleBack}
    >
      <KeyboardArrowLeftRoundedIcon />
      {text}
    </ButtonStyled>
  )
}

export default BackButton;