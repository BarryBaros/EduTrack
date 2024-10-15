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
                        <div className='logo'>EduTrack</div>
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