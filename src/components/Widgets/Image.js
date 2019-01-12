import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

export class Image extends React.Component {
    state = {
        isLoading: true
    }

    imageLoadHandler = () => {
        this.setState({
            isLoading: false
        })
    }

    render() {
        const {data} = this.props;
        return (
            <>
                <ImageWrap href={data.image_url}>                 
                    {this.state.isLoading ? 
                        <Rotate><FaSpinner /></Rotate> 
                        : null
                    }             
                    <ImageElement 
                        src={data.image_url} 
                        onLoad={this.imageLoadHandler}                        
                    />                      
                </ImageWrap> 
                <DownloadLink href={data.image_url}> Download</DownloadLink> 
            </>
        )
    }
}

const ImageWrap = styled.a.attrs(props=> ({
    href: props.href,
    target: '_blank'
}))`    
    position: relative;
    display: block;
    width: 400px;
    margin: auto;
    z-index: 10; // ButtonWrap in App.js should be on top

    @media (max-width: 900px) {
        width: 350px;
    }

    @media (max-width: 450px) {
        width: 300px;
    }
`;

const ImageElement = styled.img.attrs(props => ({
    src: props.src
}))`
    display: block;
    width: 100%;
    height: auto;    
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Rotate = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    color: ${props => props.theme.contrastColor};
    animation: ${rotate} 2s linear infinite;

    * {
        width: 100%;
        height: auto;
    }
`;

const DownloadLink = styled.a.attrs({
    title: 'Download image',
    target: '_blank'
})`
    display: block;
    width: 100px;
    padding: 6px 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
    margin-top: 10px;
    color: ${props => props.theme.contrastColor};
    background-color: ${props => props.theme.mainColor};  
    text-align: center;
    border-radius: 2px;
    cursor: pointer;  
`;
