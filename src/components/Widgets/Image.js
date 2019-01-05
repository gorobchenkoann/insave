import React from 'react';
import styled from 'styled-components';

export const Image = ({data}) => {
    return (
        <Wrap>
            <DownloadLink>Download</DownloadLink>
            <ImageWrap href={data.image_url}>              
                <ImageElement src={data.image_url} />  
            </ImageWrap> 
        </Wrap>
    )
}

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const DownloadLink = styled.a.attrs({
    title: 'Download image'
})`
    display: block;
    width: 100px;
    padding: 6px 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    color: ${props => props.theme.contrastColor};
    background-color: ${props => props.theme.mainColor};  
    text-align: center;
    border-radius: 2px;
    cursor: pointer;  
`;

const ImageElement = styled.img.attrs(props => ({
    src: props.src
}))`
    display: block;
    width: 100%;
    height: auto;
`;

const ImageWrap = styled.a.attrs(props=> ({
    href: props.href,
    target: '_blank'
}))`    
    position: relative;
    width: 400px;
    margin: auto;

    @media (max-width: 900px) {
        width: 350px;
    }

    @media (max-width: 400px) {
        width: 300px;
    }
`;
