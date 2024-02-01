import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <header>
                    <nav className='navbar navbar-expand-md navbar-dark bg-dark' >
                        <div>
                            <a hsrf="" className='navbar-brand'> Task Tracker Application</a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;