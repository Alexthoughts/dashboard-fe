export const textAreaStyle = {
    '& label': {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    '& label.Mui-focused': {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiOutlinedInput-input': {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgba(255, 214, 0, 0.5)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(955, 555, 9, 0.2)',
        },
        '&:hover fieldset': {
            border: '2px solid rgba(955, 555, 9, 0.3)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(255, 214, 0, 0.5)',
        },
    },
};

export const textAreaStyleReadonly = {
    '& .MuiFilledInput-input': {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgba(255, 214, 0, 0.5)',
    },
    '& .MuiFilledInput-root': {
        backgroundColor: 'rgba(192, 192, 192, 0.05)',
        paddingTop: '8px',
        '&::before': {
            borderColor: 'rgba(955, 555, 9, 0.2)',
        },
        '&::after': {
            border: '1px solid rgba(255, 214, 0, 0.5)',
        },
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 0, 0.05)',
        },
        '&:not(.Mui-disabled):hover::before': {
            borderColor: 'rgba(255, 214, 0, 0.5)',
        },
    },
};
