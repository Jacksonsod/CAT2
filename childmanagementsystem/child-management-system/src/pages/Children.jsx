import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Form from '../components/Form'; // Import Form component

const Children = () => {
    const [childrenList, setChildrenList] = useState([]); // State to store registered children

    const handleFormSubmit = (childData) => {
        setChildrenList([...childrenList, childData]); // Add new child to the list
    };

    return (
        <div>
            <Navbar />
            <main>
                <h2>Children Page</h2>
                <p>
                    Manage the details of children enrolled in the daycare. Add, update, or view their profiles.
                </p>
                <Form onSubmit={handleFormSubmit} /> {/* Use Form component */}
                <section>
                    <h3>Registered Children</h3>
                    <ul>
                        {childrenList.map((child, index) => (
                            <li key={index}>
                                <strong>Name:</strong> {child.name}, <strong>Year of Birth:</strong> {child.yearOfBirth}, 
                                <strong> Parent:</strong> {child.parentName}, <strong>Contact:</strong> {child.contact}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Children;
