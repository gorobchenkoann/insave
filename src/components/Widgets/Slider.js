import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
                <SliderButtonLeft onClick={this.slideLeft}>
                    <FaChevronLeft />
                </SliderButtonLeft>            
                {this.getSlide()}
                <SliderButtonRight onClick={this.slideRight}>
                    <FaChevronRight />
                </SliderButtonRight>
            </SliderWrap>
        )
    }
}

const SliderWrap = styled.div`
    display: flex;
    margin: auto;
`;

const SliderButton = styled.button`
    width: 40px;
    height: 40px;
    margin-top: auto;
    margin-bottom: auto;
    color: ${props => props.theme.contrastColor};
    background-color: transparent; 
    opacity: 0.5; 
    border: 0;
    cursor: pointer;
    outline: none;

    * {
        width: 100%;
        height: auto;
    }

    &:hover {
        color: ${props => darken(0.2, props.theme.contrastColor)};
    }

    &:active {
        color: ${props => darken(0.4, props.theme.contrastColor)};
    }
`;

const SliderButtonLeft = styled(SliderButton).attrs({
    title: 'Previous slide'
})`
    margin-right: 20px;
`;

const SliderButtonRight = styled(SliderButton).attrs({
    title: 'Next slide'
})`
    margin-left: 20px;
`;