import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row text-center">
          <div className="d-flex flex-column align-items-center">
            <h5 className="text-uppercase fw-bold">About Event Hunt</h5>
            <p className="text-center">
              Event Hunt is your go-to platform for discovering and hosting <br />amazing events. 
              We connect people with shared passions to <br />create unforgettable experiences. 
            </p>
          </div>

          <div className="d-flex flex-column align-items-center">
            <h5 className="text-uppercase fw-bold">Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-center">
              <li className="mx-3">
                <a href="https://facebook.com/itssanzid" target="_blank" rel="noopener noreferrer" className="text-dark">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              </li>
              <li className="mx-3">
                <a href="https://twitter.com/iamsanzi" target="_blank" rel="noopener noreferrer" className="text-dark">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              </li>
              <li className="mx-3">
                <a href="https://instagram.com/sanzidislam" target="_blank" rel="noopener noreferrer" className="text-dark">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </li>
              <li className="mx-3">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center py-3 bg-dark text-white">
        Made with <span className="text-danger">❤️</span> by <strong>Sanzid Islam Mahi</strong>
      </div>
    </footer>
  );
};

export default Footer;
