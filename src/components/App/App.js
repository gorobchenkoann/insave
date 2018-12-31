import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './App.scss';

export class App extends React.Component {
    state = {
        value: null
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
        console.log('Search image: ', this.state.value)
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
            </div>
        )
    }
}