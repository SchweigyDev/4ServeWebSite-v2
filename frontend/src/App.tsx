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

// ⬅️ new import (adjust path if you put it somewhere else)
import SiteShell from "./components/layout/SiteShell";

function App() {
    return (
        <SiteShell>
            {/* Everything inside here lives in the middle column */}
            <Navbar />
            <Hero />
            <WhatsBroken />
            <TheSolution />
            <HowItWorks />
            <TheUserSide />
            <UserCases />
            {/* <UserCaseShowCase /> */}
            <CTA />
            <Footer />
            <ScrollToTop />
            <ChatbotButton />
        </SiteShell>
    );
}

export default App;
