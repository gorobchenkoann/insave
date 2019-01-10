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
    width: 100%;
    margin: auto;

    @media (max-width: 900px) {
        width: 350px;
    }

    @media (max-width: 450px) {
        width: 300px;
    }
`;

const SliderButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    width: 40px;
    height: 40px;
    color: ${props => props.theme.contrastColor};
    background-color: transparent; 
    opacity: 0.5; 
    border: 0;    
    cursor: pointer;
    outline: none;

    * {
        margin: auto;
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

    @media (max-width: 580px) {
        width: 30px;
        height: 30px;
        background-color: ${props => props.theme.mainColor};
        border-radius: 50%;
    }
`;

const SliderButtonLeft = styled(SliderButton).attrs({
    title: 'Previous slide'
})`
    left: 100px;

    @media (max-width: 900px) {
        left: -50px;
    }

    @media (max-width: 580px) {
        left: 5px;
        z-index: 1000;
    }
`;

const SliderButtonRight = styled(SliderButton).attrs({
    title: 'Next slide'
})`
    right: 100px;

    @media (max-width: 900px) {
        right: -50px;
    }

    @media (max-width: 580px) {
        right: 5px;
        z-index: 1000;
    }
`;