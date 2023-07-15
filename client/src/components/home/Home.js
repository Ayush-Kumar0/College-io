import { React, useEffect } from 'react';
import './assets/css/styles.css';

function Home() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "assets/js/main.js";
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        }
    }, []);
    // console.log(req.user);
    return (
        <>
            {/* =============== HEADER =============== */}
            {/* <header className="header" id="header">
                <nav className="nav container">
                    <a href="#" className="nav__logo">
                        <img src="assets/images/logo.png" alt="" />
                    </a>

                    <div className="nav__menu" id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a href="#home" className="nav__link active-link">Home</a>
                            </li>
                            <li className="nav__item">
                                <a href="#specs" className="nav__link">Login</a>
                            </li>
                            <li className="nav__item">
                                <a href="#case" className="nav__link">Case</a>
                            </li>
                            <li className="nav__item">
                                <a href="#products" className="nav__link">Products</a>
                            </li>
                        </ul>

                        <div className="nav__close" id="nav-close">
                            <i className="ri-close-line"></i>
                        </div>
                    </div>

                    <div className="nav__toggle" id="nav-toggle">
                        <i className="ri-function-line"></i>
                    </div>
                </nav>
            </header> */}

            <main className="main">

                {/* =============== HOME =============== */}
                <section className="home section" id="home">
                    <div className="home__container container grid">

                        <div className='child_img_container'>

                            <img src="assets/images/home.png" alt="" className="home__img" />
                        </div>

                        <div className="home__data">
                            <div className="home__header">
                                <h1 className="home__title">COLLEGE</h1>
                                <h2 className="home__subtitle">.io</h2>
                            </div>

                            <div className="home__footer">
                                <h3 className="home__title-description">Overview</h3>
                                <p className="home__description">ENJOY the world of college immersed in the classic plethora of connectivity along with the new world
                                </p>
                                <a href="#" className="button button--flex">
                                    <span className="button--flex">
                                        <i ></i>LOGIN
                                    </span>
                                    <span className="home__price">  </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =============== SPONSOR =============== */}
                <section className="sponsor section">
                    <div className="sponsor__container container grid">
                        <img src="assets/images/sponsor1.png" alt="" className="sponsor__img" />
                        <img src="assets/images/sponsor2.png" alt="" className="sponsor__img" />
                        <img src="assets/images/sponsor3.png" alt="" className="sponsor__img" />
                        <img src="assets/images/sponsor4.png" alt="" className="sponsor__img" />
                    </div>
                </section>

                {/* =============== SPECS =============== */}
                <section className="specs section grid" id="specs">
                    <h2 className="section__title section__title-gradient">Specs</h2>

                    <div className="specs__container container grid">
                        <div className="specs__content grid">
                            <div className="specs__data">
                                <i className="ri-bluetooth-line specs__icon"></i>
                                <h3 className="specs__title">Connection</h3>
                                <span className="specs__subtitle">Bluetooth v5.2</span>
                            </div>

                            <div className="specs__data">
                                <i className="ri-battery-charge-line specs__icon"></i>
                                <h3 className="specs__title">Battery</h3>
                                <span className="specs__subtitle">Duration 40h</span>
                            </div>

                            <div className="specs__data">
                                <i className="ri-plug-line specs__icon"></i>
                                <h3 className="specs__title">Load</h3>
                                <span className="specs__subtitle">Fast charge 4.2-AAC</span>
                            </div>

                            <div className="specs__data">
                                <i className="ri-mic-line specs__icon"></i>
                                <h3 className="specs__title">Microphone</h3>
                                <span className="specs__subtitle">Supports Apple Siri <br /> and Google</span>
                            </div>
                        </div>

                        <div>
                            <img src="assets/images/specs.png" alt="" className="specs__img" />
                        </div>
                    </div>
                </section>

                {/* =============== CASE =============== */}
                <section className="case section grid" id="case">
                    <h2 className="section__title section__title-gradient">Case</h2>

                    <div className="case__container container grid">
                        <div>
                            <img src="assets/images/case.png" alt="" className="case__img" />
                        </div>

                        <div className="case__data">
                            <p className="case__description">With a comfortable and adaptable case so that you can
                                store it whenever you want, and keep your durability forever.
                            </p>
                            <a href="#" className="button button--flex">
                                <i className="ri-information-line button__icon"></i> More info
                            </a>
                        </div>
                    </div>
                </section>

                {/* =============== DISCOUNT =============== */}
                <section className="discount section">
                    <div className="discount__container container grid">
                        <div className="discount__animate">
                            <h2 className="discount__title">Immerse yourself in <br /> your music</h2>
                            <p className="discount__description">Get it now, up to 50% off.</p>
                            <a href="#" className="button button--flex">
                                <i className="ri-shopping-bag-line button__icon"></i> Shop Now
                            </a>
                        </div>

                        <img src="assets/images/discount.png" alt="" className="discount__img" />
                    </div>
                </section>

                {/* =============== PRODUCTS =============== */}
                <section className="products section" id="products">
                    <h2 className="section__title section__title-gradient products__line">
                        Choose <br /> Your Style
                    </h2>

                    <div className="products__container container grid">
                        <article className="products__card">
                            <div className="products__content">
                                <img src="assets/images/product1.png" alt="" className="products__img" />

                                <h3 className="products__title">Sports</h3>
                                <span className="products__price">the world of sports in college</span>


                            </div>
                        </article>
                        <article className="products__card">
                            <div className="products__content">
                                <img src="assets/images/product2.png" alt="" className="products__img" />

                                <h3 className="products__title">Meeting new people</h3>
                                <span className="products__price">the world of new people</span>

                            </div>
                        </article>
                        <article className="products__card">
                            <div className="products__content">
                                <img src="assets/images/product3.png" alt="" className="products__img" />

                                <h3 className="products__title">Cultures and Diversity</h3>
                                <span className="products__price">Unlock new Diversity</span>


                            </div>
                        </article>
                        <article className="products__card">
                            <div className="products__content">
                                <img src="assets/images/product4.png" alt="" className="products__img" />

                                <h3 className="products__title">The world of music</h3>
                                <span className="products__price">meet new people with new music taste</span>


                            </div>
                        </article>

                        <article className="products__card">
                            <div className="products__content">
                                <img src="assets/images/product5.png" alt="" className="products__img" />

                                <h3 className="products__title">Solve your Doubts</h3>
                                <span className="products__price">meet new people and learn with them</span>

                            </div>
                        </article>
                        <article className="products__card">
                            <div className="products__content">
                                <img src="assets/images/laugh.png" alt="" className="products__img" />

                                <h3 className="products__title">laugh</h3>
                                <span className="products__price">laugh others</span>


                            </div>
                        </article>
                    </div>
                </section>
            </main>
        </>
    );
}
function Footer() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "assets/js/main.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);
    return (
        <>
            {/* =============== FOOTER =============== */}
            <footer className="footer section">
                <div className="footer__container container grid">
                    <a href="#" className="footer__logo">
                        <img src="assets/images/logo.png" alt="" />
                    </a>



                    <div className="footer__content">
                        <h3 className="footer__title">Support</h3>

                        <ul className="footer__links">
                            <li>
                                <a href="#" className="footer__link">Connect with us</a>
                            </li>
                            <li>
                                <a href="#" className="footer__link">Register</a>
                            </li>
                            <li>
                                <a href="#" className="footer__link">Updates</a>
                            </li>
                            <li>
                                <a href="#" className="footer__link">Provides</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__content">
                        <form action="" className="footer__form">
                            <input type="email" placeholder="Email" className="footer__input" />
                            <button className="button button--flex">
                                <i className="ri-send-plane-line button__icon"></i> Subscribe
                            </button>
                        </form>

                        <div className="footer__social">
                            <a href="https://www.facebook.com/" target="_blank" className="footer__social-link">
                                <i className="ri-facebook-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" className="footer__social-link">
                                <i className="ri-instagram-line"></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" className="footer__social-link">
                                <i className="ri-twitter-line"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <p className="footer__copy">
                    <a href="#" target="_blank" className="footer__copy-link">&#169; College.io. All right reserved</a>
                </p>
            </footer>

            {/* =============== SCROLL UP =============== */}
            <a href="#" className="scrollup" id="scroll-up">
                <i className="ri-arrow-up-s-line scrollup__icon"></i>
            </a>
        </>
    );
}


export { Home, Footer };