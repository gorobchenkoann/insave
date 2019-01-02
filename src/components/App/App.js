import React from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import { FaSearch, FaSun, FaMoon, FaGithub } from 'react-icons/fa';
import bgDark from '../../assets/bg-dark.png';
import bgLight from '../../assets/bg-light.png';

export class App extends React.Component {
    state = {
        value: null,
        image_url: null,
        theme: 'dark'
    }

    inputChangeHandler = e => {
        this.setState({
            value: e.target.value
        })
    }

    btnClickHandler = e => {
        e.preventDefault();
        if (this.state.value) {
            this.searchImage();
        }
    }

    searchImage = () => {
        axios.get(this.state.value)
            .then(response => {
                let data = response.data;
                data = data.split('window._sharedData = ')[1];
                data = data.split(';</script>')[0];
                data = JSON.parse(data);
                console.log(data)
                let image_url = data.entry_data.PostPage[0].graphql.shortcode_media.display_url;
                this.setState({image_url: image_url});
            })
            .catch(error => console.log(error))            
    }

    toggleTheme = () => {
        this.setState(state => ({
            theme: 
                state.theme === 'dark' ? 'light' : 'dark'
        }))
    }

    render() {
        return (
            <Container>
                <ThemeButton 
                    onClick={this.toggleTheme}
                >
                    {this.state.theme === 'dark' ? <FaSun /> : <FaMoon />}                
                </ThemeButton>
                <InnerContainer>
                    {this.state.image_url ? null :
                    <Title>
                        You can download photos from Instagram using this app. 
                        To do this, copy the link to the post in Instagram 
                        and paste into the box below.
                    </Title>
                    }
                    <SearchFrom>
                        <SearchInput 
                            value={this.state.values}
                            onChange={this.inputChangeHandler}
                        />
                        <SubmitButton 
                            onClick={this.btnClickHandler}
                        >
                            <FaSearch />
                        </SubmitButton>
                    </SearchFrom>
                </InnerContainer>
                {this.state.image_url ? 
                    <ImageWrap href={this.state.image_url}>            
                        <Image src={this.state.image_url} />  
                    </ImageWrap>                  
                    : null
                }
                <CopyrightText>
                    <CopyrightIcon><FaGithub /></CopyrightIcon>
                    Made by <CopyrightLink>gorobchenkoann</CopyrightLink>                    
                </CopyrightText>
            </Container>            
        )
    }
}

const theme = {
    dark: {
        background: '',
        color: '#cacaca'
    },
    light: {
        background: '',
        color: '#000000'
    }
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    background-image: url(${bgDark});   
`;

const InnerContainer = styled.div`
    width: 800px;
    margin: 0 auto;
`;

const ThemeButton = styled.button.attrs({
    title: 'Change color theme'
})`
    display: flex;
    position: absolute;
    top: 40px;
    right: 40px;
    width: 50px;
    height: 50px;    
    background: #cacaca;
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    outline: none;

    * {
        margin: auto;
        width: 50%;
        height: auto;
    }
`;

const Title = styled.h1`
    margin-top: 100px;
    font-size: 22px;
    color: #ffffff;
    text-align: center;
    font-weight: 400;
`;

const SearchFrom = styled.form`
    display: flex;    
    height: 50px;
    padding: 40px;
    margin-top: 20px;
    background: rgba(0, 0, 0, 0.5);
`;

const SearchInput = styled.input.attrs({
    type: 'text',
    placeholder: 'https://www.instagram.com/p/BqdB0YHgOri/'
})`
    flex-grow: 1;
    padding: 5px;
    margin-right: 10px;
    font-size: 16px;
    background: #cacaca;
    border: 0;
    outline-color: #076d31;
`;

const SubmitButton = styled.button.attrs({
    type: 'submit',
    title: 'Search' 
})`
    padding: 0;
    width: 50px;
    flex-shrink: 0;
    background: #076d31;
    cursor: pointer;
    border: 0;    
    outline: none;

    * {
        width: 40%;
        height: auto;
    }

    &:hover {
        background: darken(#076d31, 10%);
    }

    &:active {        
        box-shadow: inset 2px 2px 2px darken(#076d31, 15%);
    }
`;

const ImageWrap = styled.a.attrs(props=> ({
    href: props.href,
    target: '_blank'
}))`
    margin: auto;
    width: 400px;
`;

const Image = styled.img.attrs(props => ({
    src: props.src
}))`
    width: 100%;
    height: auto;
`;

const CopyrightText = styled.p`
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #cacaca;
`;

const CopyrightLink = styled.a.attrs({
    href: 'https://github.com/gorobchenkoann' ,
    target: '_blank',
    title: 'Author on Github'
})`
    color: #cacaca;

    &:hover {
        color: #9c9c9c;
    }
`;

const CopyrightIcon = styled.a.attrs({
    href: 'https://github.com/gorobchenkoann/insave',
    target: '_blank',
    title: 'Project on Github'    
})`
    width: 20px;
    height: 20px;
    margin-right: 5px;
    vertical-align: middle;
    color: #cacaca;

    * {
        width: 20px;
        height: auto;
    }

    &:hover {
        color: #9c9c9c;
    }
`;
