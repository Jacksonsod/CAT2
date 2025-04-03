import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import homeImage from '../images/lmage.jpg'; // Importing the image
import "../styles/components.css";

const Home = () => {
    return (
        <>
        <div className="home-container">
            <header>
                <Navbar />
            </header>
            <main className="home-main">
                <section className="home-section welcome-section">
                    <h1>Welcome to the Child Management System</h1>
                    <p>
                        Our platform is designed to help you manage and monitor child-related activities 
                        with ease. Stay organized and ensure the best care for children.
                    </p>
                    <img src={homeImage} alt="Child Management" className="home-image" />
                </section>
            </main>
            
        </div>
        <Footer />
        </>
    );
};

export default Home;
