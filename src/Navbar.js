import React, {useState, useRef, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {links, social} from './data.js'
import logo from './logo.png'

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const linksContainerRef = useRef(null)
    const linksRef = useRef(null)
    const smallLinksRef = useRef(null)

    const handleResize = () => {
        setTimeout(() => setWidth(window.innerWidth), 100)        
    }
    window.addEventListener('resize', handleResize)

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height        
        if(showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`
        } else {
            linksContainerRef.current.style.height = `0px`
        }
    }, [showLinks])

    useEffect(() => {
        if(width >= 425) { 
            smallLinksRef.current.style.display = 'flex'
            linksContainerRef.current.style.display ='none'
            setShowLinks(false)
        }
        else{
            smallLinksRef.current.style.display = 'none'
            linksContainerRef.current.style.display = 'block'
            setShowLinks(true)
        }
        return () => {
            window.removeEventListener('resize', handleResize)            
        }
    }, [width])

    return (
        <nav>
            <div className='navbar'>
                <div className='nav-header'>
                    <img src={logo} alt="logo" />                    
                    
                    <ul className='links-small' ref={smallLinksRef}>
                        {links.map(link => {
                            const {id, url, text} = link
                            return (
                                <li key={id}>
                                    <a href={url}>{text}</a>
                                </li>
                            )
                        })}
                    </ul>

                    <ul className='social-icons'>
                    {social.map(item => {
                        const {id, url, icon} = item
                        return (
                            <li key={id}>
                                <a href={url}>{icon}</a>
                            </li>
                        )
                    })}
                </ul>

                    <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}>
                        <FaBars />
                    </button>
                </div>                
                
            </div>

            <div className='links-container' ref={linksContainerRef}>
                <ul className='links' ref={linksRef}>
                    {links.map(link => {
                        const {id, url, text} = link
                        return (
                            <li key={id}>
                                <a href={url}>{text}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </nav>
    )
}

export default Navbar