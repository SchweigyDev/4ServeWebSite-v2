import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import newLogo from '../assets/images/4ServeLogoStandAlone.jpg';

const Navbar = () => {
    const [_windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const links = [
        { name: "Whats Broken", target: "whats-broken-section" },
        { name: "The Solution", target: "solution-section" },
        { name: "How It Works", target: "how-it-works-section" },
        { name: "The User Side", target: "user-side-section" },
        { name: "User Cases", target: "user-cases-section" },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        const navbar = document.querySelector("nav");
        if (element && navbar) {
            const navbarHeight = navbar.getBoundingClientRect().height; // dynamic height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            setIsOpen(false); // closes mobile menu if open
        }
    };


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 12px",
                background: "#161618",
                color: "white",
                boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.4)" : "none",
                transition: "background 0.3s",
            }}
        >
            {/* Logo */}
            <div className="logo" style={{ flex: "0 0 auto" }}>
                <img
                    src={newLogo}
                    alt="Logo"
                    style={{
                        height: isMobile ? "36px" : "clamp(36px, 5vw, 50px)",
                        width: "auto",
                    }}
                />
            </div>

            {/* Desktop Links */}
            {!isMobile && (
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                        marginLeft: "30px",
                    }}
                >
                    {links.map(link => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.target)}
                            className="nav-link"
                            style={{
                                fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Desktop Right Side */}
            {!isMobile && (
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <a href="#" className="social-icon facebook" style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)" }}><FaFacebookF /></a>
                    <a href="#" className="social-icon twitter" style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)" }}><FaTwitter /></a>
                    <a href="#" className="social-icon instagram" style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)" }}><FaInstagram /></a>
                    <button
                        className="cta-button floating-button"
                        style={{
                            fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
                            padding: "4px 10px",
                        }}
                    >
                        Dashboard Log-In
                    </button>
                </div>
            )}

            {/* Mobile Hamburger */}
            {isMobile && (
                <>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`hamburger ${isOpen ? "open" : ""}`}
                        style={{
                            fontSize: "1.5rem",
                            color: "white",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            zIndex: 110,
                            position: "relative",
                            width: "26px",
                            height: "20px",
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {isOpen && (
                        <div
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                zIndex: 100,
                            }}
                        />
                    )}

                    {/* Mobile Menu */}
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            right: isOpen ? "0" : "-100%",
                            height: "100vh",
                            width: "250px",
                            background: "#161618",
                            transition: "right 0.3s ease-in-out",
                            paddingTop: "60px",
                            zIndex: 105,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {links.map(link => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.target)}
                                className="mobile-link"
                                style={{ fontSize: "0.9rem", background: "none", border: "none", cursor: "pointer" }}
                            >
                                {link.name}
                            </button>
                        ))}

                        <div style={{ display: "flex", justifyContent: "center", padding: "12px", gap: "10px" }}>
                            <a href="#" className="social-icon facebook"><FaFacebookF /></a>
                            <a href="#" className="social-icon twitter"><FaTwitter /></a>
                            <a href="#" className="social-icon instagram"><FaInstagram /></a>
                            <button className="cta-button floating-button">Dashboard Log-In</button>
                        </div>
                    </div>
                </>
            )}

            {/* Styles */}
            <style>{`
        html { scroll-behavior: smooth; }

        .nav-link {
          color: white;
          padding: 5px 8px;
          border-radius: 6px;
          font-weight: 500;
          position: relative;
          text-decoration: none;
          transition: all 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, #0066FF, #00D4FF);
          transition: width 0.3s ease;
          border-radius: 1px;
        }
        .nav-link:hover::after { width: 100%; }

        .cta-button {
          border-radius: 6px;
          background: linear-gradient(90deg, #0066FF, #00D4FF);
          color: white;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.3s, box-shadow 0.3s;
          box-shadow: 0 0 0 rgba(0,102,255,0);
        }
        .cta-button:hover, .floating-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px #0066FF, 0 0 15px #00D4FF;
        }
        .floating-button {
          animation: float 2.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .social-icon {
          color: white;
          transition: all 0.3s ease;
        }
        .social-icon.facebook:hover { transform: scale(1.2); color: #3b5998; }
        .social-icon.twitter:hover { transform: scale(1.2); color: #1da1f2; }
        .social-icon.instagram:hover { transform: scale(1.2); color: #e1306c; }

        .hamburger span {
          display: block;
          height: 2.2px;
          width: 26px;
          background: white;
          margin: 4px 0;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(0, 7px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(0, -7px); }

        .mobile-link {
          color: white;
          text-decoration: none;
          padding: 10px 16px;
          position: relative;
          transition: all 0.3s ease;
        }
        .mobile-link::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, #0066FF, #00D4FF);
          transition: width 0.3s ease;
          border-radius: 1px;
        }
        .mobile-link:hover::after { width: 100%; }
      `}</style>
        </nav>
    );
};

export default Navbar;
