import { styled } from '@mui/material/styles';

import { LinearProgress } from '@mui/material';

const LinearProgressStyled = styled(LinearProgress)({
background: '#00B9AE',
borderRadius: '4px',
'.MuiLinearProgress-bar': {
  backgroundColor: '#F9F9F9'
}
});

export default LinearProgressStyled;