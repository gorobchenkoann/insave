import bgDark from '../assets/bg-dark.png'
import bgLight from '../assets/bg-light.png';

export const theme = {
    dark: {
        backgroundImage: `url(${bgDark})`,
        backgroundColor: '#1f1f1f' ,
        textColor: '#cacaca'
    },
    light: {
        backgroundImage: `url(${bgLight})`,
        backgroundColor: '#cacaca' ,
        textColor: '#1f1f1f'
    }
}