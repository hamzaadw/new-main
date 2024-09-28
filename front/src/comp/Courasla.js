import React from 'react';
import pic1 from "../images/pic1.webp";
import pic2 from "../images/Trendy_-_Top_Banner.webp";
import pic3 from "../images/shiza_slider.webp";
import pic4 from "../images/web-banner.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './animations.css'; // Import the custom CSS file

function Courasla() {
    return (
        <div
            id="carouselExampleIndicators"
            className="carousel slide mt-5 carousel-container"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100 img-fluid" src={pic4} alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 img-fluid" src={pic2} alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 img-fluid" src={pic3} alt="Third slide" />
                </div>
            </div>
            <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </a>
        </div>
    );
}

export default Courasla;
