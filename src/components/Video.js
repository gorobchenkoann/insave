import React from 'react';
import styled from 'styled-components';

export const Video = ({data}) => {
    console.log(data)
    return (
        <VideoElement controls>
            <source src={data.video_url} type='video/mp4'></source>
        </VideoElement>
    )
}

const VideoElement = styled.video`
    width: 400px;
    height: auto;
    margin: auto;

    @media (max-width: 900px) {
        width: 350px;
    }
`;