import React from 'react';

function Homepage(){
    return (
            < div className="app">
                {/* sidebar */}
                <aside className='sidebar'>
                    <ul>
                        <li><a href='#' className='social-icon linkedin'>*</a></li>
                        <li><a href='#' className='social-icon instagram'>*</a></li>
                        <li><a href='#' className='social-icon youtube'>*</a></li>
                    </ul>
                </aside>

                {/* main content */}

                <div className='main-content'>
                    <header className='header'>
                        <div className='logo'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAApVJREFUaEPtmM/LTUEYxz9vUoTy842wEaUsFEmspBQ7kliQhQ1J+QfkTyArFpYivBspG5KSRIkFiY2FnxsssBPzrbk1bnPOeebM3Hu6OlOnexczz/P9zPOdOc+9U0z4mJpw/fQAXVewr0Bfgcwd6C00tIEbgX3AXmAucC94vmdudnR5iQqEovW9ajz0MHcBfS8y2gJYRVeJVDXC6rxpS5MCkCu6TqMAWtmtCWCUouuAzHaLAXQlupXdYgB/2vpxTOv+0fxfAmwGDgKHgNVj2lVLmqvAJeBBOLnpEO/xMAKaY8lSeM5P4KIX/jYWuwlgsEbiBaFHUKMeEqvdlnhBVA4rQBhAtpK9BCO7lRyyh4TLLqbRBiAMXOq8RP1tIcgFCHOknpdGf5cCeAncAK4567w2BG06LxZ/z/Jd7Sn/+bUqr6UC4YvtVSJMeF5+GPy9GDgOnABWedFLgGIAsSt4uUv62VCZuimbgNPAkcgkQX0rVYEYwG/gETAD3ATeG2FmA/sB2WR7zZqRV2C4d3riYa4D7yLCpr1NZJUVBtixA4SangeVWQicBA4bRIdTFjl7Vf4cTT3EMQuNunvttAKJmx2dng3wy//DMBz9gutWL7t7+kUJlTUx5tf1QxYL3QF2j1hkVXhdCFvrclsA1rr/eXQY53UAsRO4nwug9XrR3AJWjhHigH+v1Ka0VGAQYClwrsU1mMqstuEocNuyMAVgEE9lPQPssCRInKOL4WzdvT8crw3AIMYa4BiwC9iSKDSc/gm4ApwHPqTGyQEIcy0AtrlOdYNru9c7QeuAZYAaMT1qsXUdfwE+Amqpn7nb7THwNFV07G2aE6PTtaUq0BlED9DZ1vvEfQX6CmTuQG+hzA3MXj7xFfgLbDF9MUpyEbkAAAAASUVORK5CYII="/>
                            EduTrack
                            
                            </div>
                        <nav>
                            <button className='logout-btn'>Log Out</button>
                        </nav>
                    </header>
                

                <main>
                    <section className='hero'>
                        <h1>Empowering <br/> Minds, Enriching <br/> Futures. </h1>
                        
                        <p>
                            EduTrack empowers you to stay on top of your educational <br/> journey and make every step count. Let’s succeed together!
                        </p>
                    </section>

                    <section className='goals'>
                        <h2>Our Goals</h2>
                        <ul>
                            <li>Facilitate seamless interaction between students, teachers and parents, ensuring <br /> everyone stays informedand engagedin the learning process.<br /></li>
                            <br />
                            <li>Provide a clear and accessible way for students to monitor their progress, set goals<br /> and celebrate achievemnets, while enabling teachers and parents to offer timely support.<br /></li>
                            <br />
                            <li>Implement an easy-to-use attendance tracking system that helps students, <br />teachers and parents stay aware of attendance patterns and address any concerns <br />early.</li>

                        </ul>
                    </section>

                    <section className='join'>
                        <div className='join-context'>
                            <div className='join-text'>
                                <h2>Join Us Now</h2>
                                <p>
                                    Join us at EduTrack and become part of a vibrant <br/> learning community!<br />
                                   
                                    Whether you're a student eager to excel, a teacher dedicated to inspiring, or a parent<br/> invested in your child's success.<br/>
                                </p>

                           </div>
                        <form className='contact-form'>
                            <h3>Get In Touch</h3>
                            <input type='email' placeholder='Email'/>
                            <textarea placeholder='Tell us why you want to join...'/>
                            <button type='submit'>Join Now</button>
                        </form>
                        </div>
                    </section>
                </main>

                <footer>
                    <div className='footer-top'>
                        <div className='contact-info'>
                            <h3>Contact us if you have more questions about us.</h3>
                            <p>Tel: +254-xx-xxx-xxxx</p>
                            <p>Email: <a href='mailto:info@edutrack.com'>info@edutrack.com</a></p>
                        </div>
                        <div className='newsletter'>
                            <h3>Subscribe to Our Newsletter</h3>
                            <form className='newsletter-form'>
                                <input type='email' placeholder='Enter your Email Here'></input>
                                <button type='submit'>Subscribe Now</button>
                            </form>
                        </div>
                    </div>

                    <div className='footer-bottom'>
                        <p>@ 2024 by EduTrack</p>
                    </div>
                </footer>
                </div>

            </div>
     );
    
}

export default Homepage;