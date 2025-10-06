// App.tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatsBroken from "./components/WhatsBroken";
import TheSolution from "./components/TheSolution";
import UserCases from "./components/UserCases";
import TheUserSide from "./components/TheUserSide";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ChatbotButton from "./components/Chatbot";

function App() {
    return (
        <div
            className="App"
            style={{
                fontFamily: "sans-serif",
                color: "#fff",
                background: "#111",
            }}
        >
            <Navbar />
            <Hero />
            <WhatsBroken />
            <TheSolution />
            <HowItWorks />
            <TheUserSide />
            <UserCases />
            <CTA />
            <Footer />
            <ScrollToTop />
            <ChatbotButton />
        </div>
    );
}

export default App;
