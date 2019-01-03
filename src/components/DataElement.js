import React from 'react';
import { Image, Video, Slider } from '.';

export const DataElement = ({dataType, data}) => {
    switch (dataType) {
        case 'image':
            return (
                <Image data={data} />
            )
        case 'video':
            return (
                <Video data={data} />
            )
        case 'slider':
            return (
                <Slider data={data} />
            )
        default:
            return null
    }
}