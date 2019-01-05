import React from 'react';
import { Image, Video } from '../';

export const Slider = ({data}) => {
    return (
        data.slides.map((slideData, index) => 
            slide.data_type === 'GraphImage' ? 
                <Image data={slideData} key={index}/>
                : <Video data={slideData} key={index}/>
        )
    )
}