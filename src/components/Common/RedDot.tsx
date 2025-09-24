import { Box, SxProps, Tooltip } from '@mui/material';

type RedDotProps = {
    sx: SxProps;
};

const RedDot: React.FC<RedDotProps> = ({ sx }) => {
    return (
        <Tooltip title="Not updated">
            <Box
                sx={{
                    color: 'red',
                    position: 'absolute',
                    fontSize: 'xxx-large',
                    width: '0.4rem',
                    height: '0.4rem',
                    borderRadius: '50%',
                    backgroundColor: 'red',
                    cursor: 'default',
                    ...sx,
                }}
            />
        </Tooltip>
    );
};

export default RedDot;
