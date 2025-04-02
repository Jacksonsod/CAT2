import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import homeImage from '../images/lmage.jpg'; // Importing the image

const Home = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="home-main">
                {/* Welcome Section */}
                <section className="home-section welcome-section">
                    <div className="welcome-content">
                        <figure className="welcome-image">
                            <img 
                                src={homeImage} 
                                alt="Day Care Management" 
                                className="home-image"
                            />
                            <figcaption>Day Care Management System</figcaption>
                        </figure>
                        <article className="welcome-text">
                            <h1>Welcome to Day Care Management</h1>
                            <p>
                                Our platform helps you manage children, caregivers, and attendance efficiently. 
                                Navigate through the menu to explore the features.
                            </p>
                        </article>
                    </div>
                </section>

                {/* Features Section */}
                <section className="home-section features-section">
                    <header>
                        <h2>Features</h2>
                    </header>
                    <ul>
                        <li>Manage children profiles</li>
                        <li>Track caregivers and schedules</li>
                        <li>Monitor attendance records</li>
                        <li>Administrative tools for system management</li>
                    </ul>
                </section>

                {/* Get Started Section */}
                <section className="home-section get-started-section">
                    <header>
                        <h2>Get Started</h2>
                    </header>
                    <p>
                        Click on the navigation links above to begin managing your daycare system.
                    </p>
                    <button className="get-started-button">Explore Now</button>
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Home;
