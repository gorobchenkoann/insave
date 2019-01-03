import React from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import { darken } from 'polished';
import { FaSearch, FaSun, FaMoon, FaGithub, FaInfo } from 'react-icons/fa';
import { DataElement } from '../';
import { theme } from '../../utils/theme';

export class App extends React.Component {
    state = {
        value: null,
        image_url: null,
        theme: 'dark',
        error: false,
        dataType: null,
        data: {}
    }

    inputChangeHandler = e => {
        this.setState({
            value: e.target.value
        })
    }

    inputClickHandler = e => {
        e.target.select();
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
                let dataObject = data.entry_data.PostPage[0].graphql.shortcode_media;               
                if (dataObject.__typename === 'GraphImage') {
                    this.setState({
                        dataType: 'image',
                        data: {
                            image_url: dataObject.display_url
                        },
                        error: false                        
                    });
                } else if (dataObject.__typename === 'GraphSidecar') {
                    let slides = dataObject.edge_sidecar_to_children.edges;
                    
                    this.setState({
                        dataType: 'slider',
                        data: {}
                    })
                } else if (dataObject.__typename === 'GraphVideo') {
                    this.setState({
                        dataType: 'video',
                        data: {
                            video_url: dataObject.video_url
                        },
                        error: false  
                    })
                }   
            })
            .catch(error => 
                this.setState({
                    error: true
                })
            )            
    }

    toggleTheme = () => {
        this.setState(state => ({
            theme: 
                state.theme === 'dark' ? 'light' : 'dark'
        }))
    }

    render() {
        return (                    
            <ThemeProvider theme={theme[this.state.theme]}>            
            <Container>             
                <ButtonWrap>
                    <Button><FaInfo /></Button>
                    <Button 
                        onClick={this.toggleTheme}
                    >
                        {this.state.theme === 'dark' ? <FaSun /> : <FaMoon />} 
                    </Button>    
                </ButtonWrap>            
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
                            onClick={this.inputClickHandler}
                        />
                        <SubmitButton 
                            onClick={this.btnClickHandler}
                        >
                            <FaSearch />
                        </SubmitButton>
                    </SearchFrom>
                </InnerContainer>
                {this.state.dataType ? 
                    <DataElement dataType={this.state.dataType} data={this.state.data}/> 
                    : null
                }
                {this.state.error ? 
                    <Error as='h2'>There is something wrong with this URL, try again.</Error> 
                    : null
                }
                <CopyrightText>
                    <CopyrightIcon><FaGithub /></CopyrightIcon>
                    Made by <CopyrightLink>gorobchenkoann</CopyrightLink>                    
                </CopyrightText>
            </Container>  
            </ThemeProvider>          
        )
    }
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 450px;
    min-height: 100vh;
    background-color: ${props => props.theme.backgroundColor}; 
    background-image: ${props => props.theme.backgroundImage};   
`;

const InnerContainer = styled.div`
    width: 800px;
    margin: 0 auto;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const ButtonWrap = styled.div`
    position: absolute;
    top: 50%;
    transfrom: translateY(-50%);
    right: 10px;
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    display: flex;
    width: 50px;
    height: 50px;  
    margin-bottom: 10px;  
    background: ${props => props.theme.contrastColor};
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    outline: none;

    &:last-child {
        margin-bottom: 0;
    }

    * {
        margin: auto;
        width: 50%;
        height: auto;
        color: ${props => props.theme.textColor};
    }

    @media (max-width: 900px) {
        width: 40px;
        height: 40px;
    }
`;

const Title = styled.h1`
    margin-top: 100px;
    font-size: 22px;
    color: ${props => props.theme.textColor};
    text-align: center;
    font-weight: 400;

    @media (max-width: 900px) {
        width: 80%;
        margin-top: 80px;
        margin-left: auto;
        margin-right: auto;
        font-size: 18px;
    }
`;

const Error = styled(Title)`
    margin-top: 30px;
    color: #970808;
    font-weight: 700;
`;

const SearchFrom = styled.form`
    display: flex;    
    height: 50px;
    padding: 40px;
    margin-top: 20px;
    margin-bottom: 10px;
    background-color: ${props => props.theme.formBackground};

    @media (max-width: 900px) {
        height: 35px;
        padding: 25px;
    }
`;

const SearchInput = styled.input.attrs({
    type: 'text',
    placeholder: 'https://www.instagram.com/p/BqdB0YHgOri/'
})`
    flex-grow: 1;
    padding: 5px;
    margin-right: 10px;
    font-size: 16px;
    background: ${props => props.theme.inputBackground};
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
    background: ${props => props.theme.submitButton};
    cursor: pointer;
    border: 0;    
    outline: none;

    * {
        width: 40%;
        height: auto;
    }

    &:hover {
        background: ${props => darken(0.1, props.theme.submitButton)};
    }

    &:active {      
        box-shadow: ${props => `inset 2px 2px 2px ${darken(0.2, props.theme.submitButton)}`} 
    }
`;

const CopyrightText = styled.p`
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: ${props => props.theme.textColor};

    @media (max-width: 900px) {
        font-size: 14px;
    }
`;

const CopyrightLink = styled.a.attrs({
    href: 'https://github.com/gorobchenkoann' ,
    target: '_blank',
    title: 'Author on Github'
})`
    color: ${props => props.theme.textColor};

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
    color: ${props => props.theme.textColor};

    * {
        width: 20px;
        height: auto;
    }

    &:hover {
        color: #9c9c9c;
    }
`;
