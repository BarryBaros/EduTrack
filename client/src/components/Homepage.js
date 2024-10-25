import React from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

function Homepage(){

    const navigate = useNavigate();

    const handleLogin = () => {
      
      navigate('/login'); 
    };

    const sendAutoReply = (form) => {
        const userEmail = form.email.value; 
        const templateParams = {
            email: userEmail,
            message: form.message.value, 
        };
    
        console.log("Sending auto-reply to:", userEmail); 
    
        emailjs.send('service_uhqjhub', 'template_j88z9jf', templateParams, 'ytAUD_1PbK-8tfe77')
        .then((result) => {
            console.log("Auto-reply sent:", result.text);
        }, (error) => {
            console.error("Error in sending auto-reply:", error);
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        
        emailjs.sendForm('service_uhqjhub', 'template_xbt2fij', e.target, 'ytAUD_1PbK-8tfe77')
        .then((result) => {
            console.log("Message sent to EduTrack:", result.text);
    
            alert("Message sent successfully!");
            sendAutoReply(e.target);
            e.target.reset(); 
        }, (error) => {
            console.error("Error sending email:", error);
            alert("An error occurred while sending the message. Please try again.");
        });
        
        
    };

    
   
    

  
    return (
            < div className="app">

                {/* main content */}

                <div className='main-content-1'>
                    <header className='header'>
                        <div className='logo'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAApVJREFUaEPtmM/LTUEYxz9vUoTy842wEaUsFEmspBQ7kliQhQ1J+QfkTyArFpYivBspG5KSRIkFiY2FnxsssBPzrbk1bnPOeebM3Hu6OlOnexczz/P9zPOdOc+9U0z4mJpw/fQAXVewr0Bfgcwd6C00tIEbgX3AXmAucC94vmdudnR5iQqEovW9ajz0MHcBfS8y2gJYRVeJVDXC6rxpS5MCkCu6TqMAWtmtCWCUouuAzHaLAXQlupXdYgB/2vpxTOv+0fxfAmwGDgKHgNVj2lVLmqvAJeBBOLnpEO/xMAKaY8lSeM5P4KIX/jYWuwlgsEbiBaFHUKMeEqvdlnhBVA4rQBhAtpK9BCO7lRyyh4TLLqbRBiAMXOq8RP1tIcgFCHOknpdGf5cCeAncAK4567w2BG06LxZ/z/Jd7Sn/+bUqr6UC4YvtVSJMeF5+GPy9GDgOnABWedFLgGIAsSt4uUv62VCZuimbgNPAkcgkQX0rVYEYwG/gETAD3ATeG2FmA/sB2WR7zZqRV2C4d3riYa4D7yLCpr1NZJUVBtixA4SangeVWQicBA4bRIdTFjl7Vf4cTT3EMQuNunvttAKJmx2dng3wy//DMBz9gutWL7t7+kUJlTUx5tf1QxYL3QF2j1hkVXhdCFvrclsA1rr/eXQY53UAsRO4nwug9XrR3AJWjhHigH+v1Ka0VGAQYClwrsU1mMqstuEocNuyMAVgEE9lPQPssCRInKOL4WzdvT8crw3AIMYa4BiwC9iSKDSc/gm4ApwHPqTGyQEIcy0AtrlOdYNru9c7QeuAZYAaMT1qsXUdfwE+Amqpn7nb7THwNFV07G2aE6PTtaUq0BlED9DZ1vvEfQX6CmTuQG+hzA3MXj7xFfgLbDF9MUpyEbkAAAAASUVORK5CYII="/>
                            EduTrack
                            
                            </div>
                        <nav>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAYZJREFUaEPtmU1KBDEQRt8cQURREc/g0nO4deFCwYU3UhEXHkXBnRtv4B8iegA3OgXd0gSnU2aqnEQqm1lMUvlevqpOujOh8TZpXD8BsGgHw4H/5sAacAbsAMtGcG/ANXAIvKYxLVNIxN8C8uvR7oFt4H0Y3BLgEtjzUD6IeQIceQE8AevOAOLClhfAZyLeyt3RuFaTiPYAmJF+4YC2LiOFak+h0+lOegx8aC3t+lVTAyLkBtidbkbPv4D4M4Ccpl6IiBcIgdG06gBEtKSRpJMc/HKtSoBetADk6qJqAAHJ1cXcAGmAnOUl/4/VRRMAY3URAM2nUElO/zRm1kK4F7EnQLOP0aY3smqPErn3geoPczmA5o/TpQ+DuTcy7cQ5B7Rx0n4BoF25cKD2l3qtkwurgUdgo1SlcpzMsTnsa/lt9ALYVwop7XYOHHgBrAB3wGqpusy4h+6CQ25svpulAxJUUqi/YloyAhHBV93Fxksa0xrASLM+TADo18qnZzjgs676qM078AVMS3AxBwogdgAAAABJRU5ErkJggg=="/>
                            <button className='logout-btn' onClick={handleLogin}>Log In</button>
                        </nav>
                    </header>
                

                <main>
                    <section className='hero'>
                        <h1>Empowering <br/> Minds, Enriching <br/> Futures. </h1>
                        
                        <p>
                        <span className="typewriter">  EduTrack empowers you to stay on top of your educational <br/> journey and make every step count. Let’s succeed together!</span>
                        </p>
                    </section>

                    <section className='goals'>
                        <h2>Our Goals</h2>
                        <ul>
                            <li>Facilitate seamless interaction between students, teachers and parents, ensuring <br /> everyone stays informed and engaged in the learning process.<br /></li>
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
                                    Join us at EduTrack and become part of a vibrant <br/> learning community!<br /><br />
                                   
                                    Whether you're a student eager to excel, a<br /> teacher dedicated to inspiring, or a parent<br/> invested in your child's success.<br/>
                                </p>

                           </div>
                           <form className='contact-form' onSubmit={sendEmail}>
                                <h3>Get In Touch</h3>
                                <input type='email' name='email' placeholder='Email' required/>
                                <textarea name='message' placeholder='Tell us why you want to join...' required/>
                                <button type='submit'>Join Now</button>
                            </form>
                        </div>
                    </section>
                </main>

                <footer>
                    <div className='footer-top'>
                        <div className='contact-info'>
                            <h3>Contact us if you have more questions about us.</h3>
                            <p>Tel: +254-20-853-2103</p>
                            <p>Email: <a href='mailto:info@edutrack.com'>info@edutrack.com</a></p>
                        </div>
                        <div className='newsletter'>
                            <h3>Subscribe to Our Newsletter</h3>
                            <form className='newsletter-form'>
                                <input type='email' name='email' placeholder='Enter your Email Here'></input>
                                <button type='submit'>Subscribe Now</button>
                            </form>
                        </div>
                    </div>

                    <div className='footer-bottom'>
                    <ul>
                        <li><a href='#' className='social-icon linkedin'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAlxJREFUaEPtmD9IlkEcxz9CkyhBg1AEkhhkhC3mEDTVmINu0lQOChZCmJmt/aOGIPwDkU5BDZUuTWkuUWviUENii1hkFDo0aT0/eF54u5673/s+PHT34t3yDnf33vdz3/v97vdcHTXe6mpcPxHAt4O7woFDwAlgB3gHrPne9fL1NQfGgUFD8D1gJBQIF8AUMGARehe4GgKEDeAI8EERuD8B/OIbwgZwHphRxHUDc6ECXACmFXE9wGyoAMeAZUXcwRAykiuIxQFxIqvdBy773n1ZX0ujj4A+Q+gDYCgE8ZUAyJi29CL7DbwFVkIRXylASHr/0aIdoaDFaw50AA0Wgh/AktEnNVOzZfx3I6t1AZeAFkAuRKmz1oHPwBPgGbBVye65HHif5Pnjlj9ZAM4YfTeBMcv4l8BZQFLvizSmXPo2gWvApAZRJMCtdNGsNQVA4BaBfZqosn6pBsws+Nf0IgFuANct4uaBA8DRKsSXhvYncx/a5uUFeA2cNv70NjCaQ6A2ZRVoTeOkqizkioH/CSCiT6YfU4UBVBvE5sKSYT4CUrY3ahaksXUna1zeI5QXQFyVUl1+S60zLcslndraU6DXN8DXJL9LlbuRIURK8+cOgDfAKd8AF4EJh8ifwF5L/yfgsG+AduUb41XG5VjS/C251Jp8A9QnDwG/HA48Bs45+jPjNW8Q50mjWuHoegURrkIB8mQhDUCeaq6E7MAeYNshUB7MhiNA2Q4UXUpEB4pMo3myUHQgOlC2A/EIZRyHeA+Ym1Lz90AFX3r+h2gFln+FioII4Nui6IBvB/4AZcmfMdHz4o0AAAAASUVORK5CYII="/></a></li>
                        <li><a href='#' className='social-icon instagram'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABRdJREFUaEPtmWWId0UUh5/XLlBR7G78oB9sERMVA7sVW1QUWxTBVgQxEUxsDOzGTkRRVBQDuzCxsbDnkbkye3fuvXN3//9XFvbAwu7cmXPmN3PO75wzO4UJLlMm+P6ZBPB/3+DkDUzEG1gA2AXYDFgCWGScID4G3gXuBa4HPu2jr48LzQycAhwOTNvHSI+5fwLnAccDv5SsKwWwHnBl+Fm0ROkA5nwI7AU81qWrBMA6wOM1Rd8CtwMvAm8Dv3UZavjurS4PrAlsDMxam7cu8ESb7i4AGngdWCwq+Qo4Mvj+NWPccNuy2cLHk6L+at4HEWCjO3UBOCf6vAoNrlWBT4aw+VTlasCzycC5wBFNNtsALAx8lCxcv8Qne4KbC9gzMtoLwMnAj8CJ8TYqdXqAcTFK2gDsB1waVzwHeDKDloOBCxKl3rguquiuAlQOBC7uC+DycAN7x0WnRWrrC8AA/T0Gem7tGcCxyQddZ434923A1vH3K4B9+gKQeWQgZQfg5oLdzxT9VfZYJXD6HHGNrPU88Ejk+Yq1TIjXJXpPCDnm1Pi37uTfyqPABn0BvJ+wj0Ce7ACwEnAjsFTHvDeBHcPpvhzn7RYoecVIEq7/LI7vn7iNmTqrty0GvgHmjMo08ErLxmSJs0IQdrFapcKMq6+f36Jz51haOMW9VPEwYkmbwb+TmY0sEJPQ07WNXA3cHa79KWDGSABbAp52JepfHZAgcrINcGv88FM4IPPEKCkFMF9ggi8y62cBXgUWj9/MFW6yqQTYELgWmDfON4uvEAL514xuA9hAVn7OZOl/P5QCmBv4OmNEDrdGqmQtoH4b9WUG48PJoIF8w7ABGAvfZYxcBewRxy8BDmhwh/qwtGixpphrDNi6DPQGZg/0+EPGiG41TxzfCHioEMDmMUac/k6g0qUz67aKBaOfrIV011FS6kLzh9P9vLZ6yWi8Gpbzvy8EYFOU1lQ5/TZM9yT6snstBZBjoeUCn7+RGGhysxwmN5x2XstksrUB/2CyeLpQDUi/I6QUgG2jrV8q00T2mH4MLpSebpN76JIPDPMG1P1M5HJ/vwXYvtCF7o8NjNPN8FXJki7fNPbJ1djAXUjFF9WYp6TkNqHdkezUbHxYBvgWwJ1x3IJwhvEEcc6F1Lcs8BJg56bo17vHoi1nT7cwkVXMZYY1kb2XmZxm4nGzUFspsV2mUrWUsGfWxSwlVga2DYG6a22jnrIlR052ShKc7FZVtsVBbPquTlaelq+b5JiwUWv70mLOOuho4OwWnSZIE6Ui5S7U14Vs4apHq7VjYdYWo6XltAfh6dpCtsm+wGVxgq1t9kmn7cSsEm1KFOv3mzoM+tmG5szQDtoq1nX/Fcvn4xqKt7p6mxmbGsXnGw9olLQBSFs6X+RstEvF3GC2terUXb6MAS6blIodoPGlyEaWFr0AHBrbPxfZDvqkMjUlbep9zvTJsRcAmce2shJpTWaZGqKbnZ4Y8hE53ct/n7pYwyRzSJxtMScb+W4zTLH3fS1JXBcCBzUZ7AIgjb6VUJin4MnI838MGIXlsod1VNL/Sp8WjY2H1gXAPW4S/P++2mZtbgxy2UGAfYIzVZU+7pql632vRV/d9oitlABwgYp8GcsmkwHfhOo8IB+yqp640UQpABX49C0vW3gN6x8c2rE6Ne/UG6gsiD4AKgULxkxqWziofzEZW2ZmXwPv6nOjYwHQR//Q504CGPoRdxiYvIHJGxjnCfwDHkX3MVHc7z4AAAAASUVORK5CYII="/></a></li>
                        <li><a href='#' className='social-icon youtube'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAq9JREFUaEPtmEuITmEYx3+TSy65TyHlHoVhXMqKxMrGhmxsFGWDDU2ZwWqQplFki9LsJnsLJUoodymlKBuXiBkiC5fz1xmdOc457/Fe+s6X89S3+s7zf57/8zzv+/7ft4Umt5Ymz5+aQKM7WHeg7oBjBeoRciygs/t/0YGNwEpgPjAbmBCXbQQwE5gBjLcs5XvgNfAu4f8BeAm8AB4CV4uwizqwFjgLrLFMzpfbnYjgXuB2FmAegXbgvq8MPOD8BNqAJ2msPAK3AHWgSnYJ2FaGwDrgepUyT+SyCHiWzC2rAx3AyYoS2A2cMxG4AOysKIFe4KCJwBVgU0UJ9APbTQQeA8scCGwGTgOaV992DdhgIvAqPpxsg2tdjQT2AUeBybZAGX4q7nITgS/RIh7rEDS5MbRGZLqBPQ54SVed0HNMBHRouFjWzqZD6Ey6/RZB3gLTiwhI5wxaAJuKMvS/DqIeYK5ljI/R+ppSFGxqNLsSWC5WRuEeAo5YjOonYGIRgTHAV5fsodRLRxfQCYyziDWsQOlqjQa+WYAOufwAJLPzbGs8QvMsY3xOyPnfEFntDrGIl8bSfNgebkHiTXqLD01A2+gJQBrGhz0HFph2DN2OpllG+x4fYqOA/fFCnWSJleV2D1htIvAUWOwQdEu0U5wCFjpg5Llejm5mkip/LGuEpDfWBwjuA/I8sMtEoC+6NOzwES0AxmHgmImADpnjAYL7gJSUlqQuHKFVwF0f0QJgrAAemQjof612vQVVyf66Cyi5PN2yBLiZ1h0NZqOCPkjnUCS8pBgvAnqlaKTdAA7868NWMmHdj3ULkn7R06KeE2fFP1di0ja6AUoi6BCUDcRPizp1NcoanVwrI31dkwzqXxMIWt4S4HUHShQp6Cd1B4KWtwR43YESRQr6SdN34BdaGFUx1x1JoQAAAABJRU5ErkJggg=="/></a></li>
                        <li><a href='#' className='social-icon youtube'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZ1JREFUaEPtl61LBUEUxX8PP8A/wGAQTH5WNYtRTIKaBLO8piA2k5hsBvEfELUZBC1mEZPff4BRRIMWwR15ivjuwtw3O+ws3i0Lw5mZc+45c3e2RsWfWsX5YwLKdtAc+A8OjAILwBDQD/QCb8Ar8NJ4rwBnrRQjZoQ6gR1g0YPYHHDggWuCxBLQBpwAk56kkhOwAax5kneweWBfgf+BxnCgD3gAOhSEknJgFdhUkE/OgSNgOkfAKeDiddnoQEqdzfAYEToHxgRm71lX6gGeg1n/WiCGgFtgUCB5k7XKkSLJu7ViCLgDBgSiFznOBGkyAUL5zAFNpkIiNJFttC5sNg50CePu8ubap/TMAE8a4t/YEAHu87/XyqZ/5nwA7a2uk4KA+5y266UpBQHHwJQXWwGUgoBtoF5lAcvAVhkC3LVgVth4CegWxh+BXWH8ELgqQ0DentfZz8lwla8SJkATp5AuZBHSVDoPaw4IlbFDrImWRcgipMlLwbdR+w4EFv9ruh1iO8SBOYoRoUBKuukmQFev4tHmQPE11a1YeQc+AR4+UzF+HUh9AAAAAElFTkSuQmCC"/></a></li>


                    </ul>
                        <p>@ 2024 by EduTrack. All rights reserved</p>
                    </div>
                </footer>
                </div>

            </div>
     );
    
}

export default Homepage;