import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        if (showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.height = '0px';
        }
    }, [showLinks]);

    return (
        <div className="App">
            <nav>
                <div className="nav-header">
                    <Link to='/'>
                        <FontAwesomeIcon
                            icon='basketball'
                            color='white'
                            className='logo'
                        />
                    </Link>
                </div>
                <div className="link-container" ref={linksContainerRef}>

                    <ul className='links' ref={linksRef}>
                        <Link to='/'>
                            <li>Home</li>
                        </Link>
                        <Link to='/players'>
                            <li>Players</li>
                        </Link>
                        <Link to='/teams'>
                            <li>Teams</li>
                        </Link>
                        <Link to='/games'>
                            <li>Games</li>
                        </Link>
                    </ul>
                </div>
                <FontAwesomeIcon
                    icon='bars'
                    color='white'
                    className='menuBar'
                    onClick={toggleLinks}
                />
            </nav>
        </div>
    )
}

export default Navbar