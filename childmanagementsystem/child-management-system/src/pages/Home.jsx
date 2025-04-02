import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import homeImage from '../images/lmage.jpg'; // Importing the image
import "../styles/components.css";

const Home = () => {
    return (
        <div className="home-container">
            <header>
                <Navbar />
            </header>
            <main className="home-main">
            <section className="home-section welcome-section">

                </section>
              </main>
            
                <Footer />
                </div>

    );
};

export default Home;
