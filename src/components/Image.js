import React from 'react';
import styled from 'styled-components';

export const Image = ({data}) => {
    return (
        <ImageWrap href={data.image_url}>            
            <ImageElement src={data.image_url} />  
        </ImageWrap> 
    )
}

const ImageWrap = styled.a.attrs(props=> ({
    href: props.href,
    target: '_blank'
}))`    
    width: 400px;
    margin: auto;

    @media (max-width: 900px) {
        width: 350px;
    }

    @media (max-width: 400px) {
        width: 300px;
    }
`;

const ImageElement = styled.img.attrs(props => ({
    src: props.src
}))`
    width: 100%;
    height: auto;
`;