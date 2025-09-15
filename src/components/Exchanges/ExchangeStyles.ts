export const selectStyle = {
    color: 'rgba(955, 555, 9, 0.8)',
    '&::before': {
        borderColor: 'rgba(955, 555, 9, 0.8)',
    },
    '&::after': {
        borderColor: 'rgba(255, 214, 0, 0.8)',
    },
    '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '5px',
    },
    '&:not(.Mui-disabled):hover::before': {
        borderColor: 'rgba(955, 555, 9, 0.8)',
    },
    '.MuiSvgIcon-root ': {
        fill: 'rgba(255, 255, 255, 0.8) !important',
    },
};

export const inputLabelStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    '&.Mui-focused': {
        color: 'rgba(255, 255, 255, 0.8)',
    },
};

export const boxStyle = {
    bgcolor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '20px',
    position: 'absolute',
    top: '0px',
    right: {
        xl: 'calc(-100% + 1rem)',
        lg: 'calc(-100% + 1rem)',
        md: '1rem',
        sm: '1rem',
        xs: '1rem',
    },
    maxWidth: '30rem',
    pl: 3,
    pr: 3,
    pb: 2,
    zIndex: 99,
};
