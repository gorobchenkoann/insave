import React from 'react';
import axios from 'axios';
import { FaSearch, FaSun, FaMoon, FaGithub } from 'react-icons/fa';
import styles from './App.scss';

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
            <div className={styles.container}>
            <button className={styles.theme_button} onClick={this.toggleTheme}>
                {this.state.theme === 'dark' ? <FaSun /> : <FaMoon />}                
            </button>
            <div className={styles.inner}>
                {this.state.image_url ? null :
                <h1 className={styles.title}>
                    You can download photos from Instagram using this app. 
                    To do this, copy the link to the post in Instagram 
                    and paste into the box below.
                </h1>
                }
                <form className={styles.form}>
                    <input 
                        type='text' 
                        value={this.state.values}
                        placeholder='https://www.instagram.com/p/BqdB0YHgOri/'
                        onChange={this.inputChangeHandler}
                        className={styles.input} 
                    />
                    <button 
                        type='submit' 
                        onClick={this.btnClickHandler}
                        className={styles.submit}
                    >
                        <FaSearch />
                    </button>
                </form>
                </div>
                {this.state.image_url ?                     
                    <img src={this.state.image_url} className={styles.image} />                    
                    : null
                }
                <p className={styles.copyright}>
                    <a 
                        href='https://github.com/gorobchenkoann/insave' 
                        target='_blank'
                        className={styles.copyright_icon}
                    ><FaGithub /></a>
                    Made by <a 
                            href='https://github.com/gorobchenkoann' 
                            target='_blank'
                            className={styles.copyright_name}
                            >gorobchenkoann</a>                    
                </p>
            </div>            
        )
    }
}