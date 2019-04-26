import React, { Component } from 'react';
import WebHeader from '../../components/WebHeader'
export default class Haeder extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            isMobile : window.innerWidth <= 768
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.mobileDetect, false);
    }
    
    mobileDetect = () => {
        this.setState({
          isMobile: window.innerWidth <= 768
        });
    };

    render() { 
        return (
            <header className='header'>
                {
                    this.state.isMobile ? null : <WebHeader />
                }
            </header>
        )
    }
    
}