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
            <Wrap>
                <DownloadLink>Download</DownloadLink>
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
            </Wrap>
        )
    }
}

const Wrap = styled.div`
    display: flex;
    flex-direction: column;   
    width: 400px;
    min-height: 300px; 
    margin: auto;
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
