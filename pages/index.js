import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import useSWR from "swr";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }
    async getServerSideProps(username, password) {

        const url =`http://localhost:8000/authentication?`+
            'username=' + username + '&'+
            'password=' + password;
        console.log(url);
        let res = await fetch(url,
            {
                method:"GET",
                headers: {
                    "content-type": "application/json",
                }
            })
            .then(response => response.text().then(function(text) {
                return text ? console.log(JSON.parse(text)) : console.log('nope');
            }));


    }
    async handleOnClick(event) {
        let res = await this.getServerSideProps(this.state.username, this.state.password);
        //console.log("username: " + this.state.username);
        //console.log("password: " + this.state.password);

    }

    handleOnChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value,
        });
    }



    render() {
        return (
            <div>
                <Head>
                    <title>Log In</title>
                </Head>
                <main className={styles.main}>
                    <div className={styles.loginContainer}>
                        <div id="Log In Container" className={styles.login}>

                            <div className={styles.verticalContainer}>
                                <div onChange={(e) => this.handleOnChange(e)}>
                                    <div className={styles.username}>
                                        <TextField id="outlined-basic" name="username" label="Username" variant="outlined" />
                                    </div>
                                    <div>
                                        <TextField id="outlined-basic" name="password" label="Password" variant="outlined"/>
                                    </div>
                                </div>
                                <div className={styles.logInButton} onClick={(e) => this.handleOnClick(e)}>
                                    <Button size="large" variant="contained" color="primary">
                                        Log In
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
