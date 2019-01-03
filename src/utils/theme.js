import bgDark from '../assets/bg-dark.png'
import bgLight from '../assets/bg-light.png';

export const theme = {
    dark: {
        backgroundImage: `url(${bgDark})`,
        backgroundColor: '#0e121b',
        textColor: '#cacaca',
        contrastColor: '#2e2e3b',
        formBackground: 'rgba(0, 0, 0, 0.5)',
        inputBackground: '#cacaca',
        submitButton: '#076d31'
    },
    light: {
        backgroundImage: `url(${bgLight})`,
        backgroundColor: '#eceae8',
        textColor: '#1f1f1f',
        contrastColor: '#cacaca',
        formBackground: 'rgba(0, 0, 0, 0.3)',
        inputBackground: '#ffffff',
        submitButton: '#208d4d'
    }
}