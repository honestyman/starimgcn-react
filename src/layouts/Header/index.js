import React, { Component } from 'react';
import WebHeader from '../../components/WebHeader'
import MobileHeader from '../../components/MobileHeader'
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
                    this.state.isMobile ? <MobileHeader /> : <WebHeader />
                }
            </header>
        )
    }
    
}