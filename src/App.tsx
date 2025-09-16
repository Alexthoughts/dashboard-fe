import { Box } from '@mui/material';
import { Header } from './components/Header';
import { DateTime } from './components/DateTime';
import { Circles } from './components/Circles';
import { Detail } from './components/Detail';
import { useState } from 'react';
import { CircleNames } from './types/types';
import MainBackground from './components/Background';
import { HolidayList } from './components/Holidays/HolidayList';
import { ExchangesDetail } from './components/Exchanges/ExchangesDetail';

function App() {
    const [circleName, setCircleName] = useState<CircleNames | null>(null);
    const [recipeImage, setRecipeImage] = useState<string>('');

    const onCircleClick = (circleName: CircleNames) => {
        setCircleName(circleName);
    };

    const onChangeRecipeImage = (image: string) => {
        setRecipeImage(image);
    };

    return (
        <MainBackground>
            <Header />
            {/* BODY */}
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: {
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                    },
                }}
                className={'light-grey'}
            >
                {/* LEFT SIDE */}
                <Box
                    sx={{
                        position: 'relative',
                        width: { xl: '50%', lg: '50%', md: '100%', sm: '100%', xs: '100%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'end',
                        alignItems: {
                            xl: 'baseline',
                            lg: 'baseline',
                            md: 'center',
                            sm: 'center',
                            xs: 'center',
                        },
                        px: 2,
                    }}
                >
                    <HolidayList />
                    <ExchangesDetail />
                    <DateTime />
                </Box>

                {/* RIGHT SIDE */}
                <Box
                    sx={{
                        width: { xl: '50%', lg: '50%', md: '100%', sm: '100%', xs: '100%' },
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* CIRCLES & DETAIL */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '90%',
                            marginTop: '10%',
                        }}
                    >
                        <Circles onClick={onCircleClick} recipeImage={recipeImage} />
                        <Detail
                            detailName={circleName}
                            onClose={() => setCircleName(null)}
                            onChangeRecipeImage={onChangeRecipeImage}
                        />
                    </Box>
                </Box>
            </Box>
        </MainBackground>
    );
}

export default App;
