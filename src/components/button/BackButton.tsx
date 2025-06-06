import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  text= 'Voltar'
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleBack} variant="outlined" color="primary">
      {text}
    </Button>
  )
}

export default BackButton;