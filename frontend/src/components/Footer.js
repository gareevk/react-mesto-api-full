import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__copyright">© {new Date().getFullYear()} Mesto Russia</h2>
        </footer>
    );
}

export default Footer;