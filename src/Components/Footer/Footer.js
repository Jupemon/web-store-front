import React from 'react';
import { SocialIcon } from 'react-social-icons';


const Footer = () => {
    return ( <div>
        <div className="social-media">
            <h4>Follow us</h4>
            <SocialIcon url="http://twitter.com/jaketrent" />
            <SocialIcon url="http://facebook.com/jaketrent" />
            <SocialIcon url="http://youtube.com/jaketrent" />
        </div>
        
    </div> );
}
 
export default Footer;