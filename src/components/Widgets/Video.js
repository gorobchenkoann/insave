import React from 'react';
import styled from 'styled-components';

export const Video = ({data}) => {
    return (
        <VideoElement controls key={data.video_url}>
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

    @media (max-width: 400px) {
        width: 300px;
    }
`;