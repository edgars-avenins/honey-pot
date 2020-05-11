import React from 'react'

export const Home = () => (
    <>
        {/* Header */}
        <section id="header">
            <div className="inner">
                <span className="icon solid major fa-cloud"></span>
                <h1>Hi, this site offers a use for <br/> sitemap.xml files <br/> found almost on all websites.</h1>
                <p>Keep reading for a brief intro into <br/> what you can find here, <br/> how to use this tool, <br/> and how to interpret it.</p>
                <ul className="actions special">
                    <li className="border rounded scrolly p-2">Keep scrolling</li>
                </ul>
            </div>
        </section>
<hr/>
        {/* One */}
        <section id="one" className="main style1">
            <div className="container">
                <div className="row gtr-150">
                    <div className="col-md-6 col-xs-12">
                        <header className="major">
                            <h2>How <strong><a href='/xml'>XML</a></strong> works</h2>
                        </header>
                        <p>After entering a site we append <em className='bg-light'>/robots.txt</em> to it and usually we would find a file with similar contents to this.</p>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <span className="image fit"><img src="images/diagram.png" alt="" /></span>
                    </div>
                </div>
            </div>
        </section>
<hr/>
        <section className="main style1">
            <div className="container">
                <div className="row gtr-150">
                    <div className="col-md-6 col-xs-12">
                        <header className="major">
                            <h2>Going deeper...</h2>
                        </header>
                        <p>In this example we might choose to explore <a href="https://www.stuff.co.nz/sitemap/sitemap.xml"><em className='bg-light'>https://www.stuff.co.nz/sitemap/sitemap.xml</em></a> which would provide us with a long list of <em className='bg-light'>.../sitemap.xml</em> files for every single day dating 5 years back</p>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <span className="image fit"><img src="images/diagram2.png" alt="" /></span>
                    </div>
                </div>
            </div>
        </section>
<hr/>
        {/* Two */}
        <section id="three" className="main style1 special mb-3">
            <div className="container">
                <header className="major">
                    <h2>Contents of this page</h2>
                </header>
                <p>A brief overview of each part.</p>
                <div className="row gtr-150">
                    <div className="col-md-4 col-xs-12">
                        <span className="image fit"><img src="images/robot.png" alt="" /></span>
                        <h3>What's hidden there?</h3>
                        <p>Just type in the site you're interested in and see if there is any hidden links laying around.</p>
                        <ul className="actions special">
                            <li><a href="#xml" className="button">More</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-xs-12">
                        <span className="image fit"><img src="images/stuff.png" alt="" /></span>
                        <div>
                        <h3>Hot yesterday</h3>
                        <p>By carefully unwrapping stuff sitemap.xml I managed to create this peek into past with nice filter options.</p>
                        <ul className="actions special">
                            <li><a href="#stuff" className="button">More</a></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-12">
                        <span className="image fit"><img src="images/Delfi.png" alt="" /></span>
                        <h3>What's going on in Latvia?</h3>
                        <p>Similar to stuff but way more challenging because of the way data was saved. Have a peek in the past.</p>
                        <ul className="actions special">
                            <li><a href="#delfi" className="button">More</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </>
)