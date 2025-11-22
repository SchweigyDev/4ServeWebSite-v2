// frontend/src/components/layout/SiteShell.tsx
import React from "react";

interface SiteShellProps {
    children: React.ReactNode;
}

const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
    return (
        <div className="site-shell">
            {/* Left blue column */}
            <div className="site-shell__side" />

            {/* Middle content column */}
            <main className="site-shell__center">
                <div className="site-shell__inner">{children}</div>
            </main>

            {/* Right blue column */}
            <div className="site-shell__side" />
        </div>
    );
};

export default SiteShell;
