import React from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { FaSearch } from 'react-icons/fa';
import styles from './App.scss';

export class App extends React.Component {
    state = {
        value: null,
        image_url: null
    }

    property = 'display_url'

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
                let image_url = data.entry_data.PostPage[0].graphql.shortcode_media.display_url;
                this.setState({image_url: image_url});
            })
            .catch(error => console.log(error))            
    }

    render() {
        return (
            <div className={styles.container}>
                <form className={styles.form}>
                    <input 
                        type='text' 
                        value={this.state.values}
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
                {this.state.image_url ?                     
                    <img src={this.state.image_url} className={styles.image} />                    
                    : null
                }
            </div>
        )
    }
}