import { Box, SxProps } from '@mui/material';

type RedButtonProps = {
    sx: SxProps;
};

const RedButton: React.FC<RedButtonProps> = ({ sx }) => {
    return (
        <Box
            sx={{
                color: 'red',
                position: 'fixed',
                fontSize: 'xxx-large',
                ...sx,
            }}
        >
            .
        </Box>
    );
};

export default RedButton;
