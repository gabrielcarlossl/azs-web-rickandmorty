import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ButtonStyled = styled(Button)({
  backgroundColor: '#3D4345',
  textTransform: 'none',
  borderRadius: '13px',
  color: '#F9F9F9',
  width: 'fit-content',
  '&:hover': {
    color: '#00B9AE',
    opacity: 0.8,
    backgroundColor: '#3D4345',
  },
});

export default ButtonStyled;