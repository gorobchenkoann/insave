import React from 'react';
import styled from 'styled-components';
import { Image, Video } from '../';

export class Slider extends React.Component {
    state = {
        currentSlide: 0        
    }

    slideLength = this.props.data.slides.length - 1
    slideData = this.props.data.slides

    slideLeft = () => {
        if (this.state.currentSlide !== 0) {
            this.setState({
                currentSlide: this.state.currentSlide - 1
            })
        }        
    }

    slideRight = () => {
        if (this.state.currentSlide !== this.slideLength) {
            this.setState({
                currentSlide: this.state.currentSlide + 1
            })
        }        
    }

    getSlide = () => {
        let currentData = this.slideData[this.state.currentSlide];
        if (currentData.data_type === 'GraphImage') {
            return <Image data={currentData} />
        } else {
            return <Video data={currentData} />
        }

    }

    render() {
        return (
            <SliderWrap>
                <SliderButtonLeft onClick={this.slideLeft}>-</SliderButtonLeft>            
                {this.getSlide()}
                <SliderButtonRight onClick={this.slideRight}>+</SliderButtonRight>
            </SliderWrap>
        )
    }
}

const SliderWrap = styled.div`
    display: flex;
    margin: auto;
`;

const SliderButton = styled.button`
    width: 20px;
    height: 40px;
    margin-top: auto;
    margin-bottom: auto;
    color: ${props => props.theme.contrastColor};
    background-color: ${props => props.theme.mainColor};  
    border: 0;
    cursor: pointer;
`;

const SliderButtonLeft = styled(SliderButton).attrs({
    title: 'Previous slide'
})`
    margin-right: 10px;
`;

const SliderButtonRight = styled(SliderButton).attrs({
    title: 'Next slide'
})`
    margin-left: 10px;
`;