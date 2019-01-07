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
                <SliderButtonLeft 
                    onClick={this.slideLeft}
                    disabled = {
                        this.state.currentSlide === 0 
                        ? true : false
                    }
                    >
                    <FaChevronLeft />
                </SliderButtonLeft>            
                {this.getSlide()}
                <SliderButtonRight 
                    onClick={this.slideRight}
                    disabled = {
                        this.state.currentSlide === this.slideLength 
                        ? true : false
                    }
                >
                    <FaChevronRight />
                </SliderButtonRight>
            </SliderWrap>
        )
    }
}

const SliderWrap = styled.div`
    position: relative;
    margin-top: 10px;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
`;

const SliderButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
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

    &:disabled {
        color: ${props => darken(0.8, props.theme.contrastColor)};
        cursor: initial;
    }
`;

const SliderButtonLeft = styled(SliderButton).attrs({
    title: 'Previous slide'
})`
    left: -50px;
`;

const SliderButtonRight = styled(SliderButton).attrs({
    title: 'Next slide'
})`
    right: -50px;
`;