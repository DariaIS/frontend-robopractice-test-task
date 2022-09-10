import React from 'react';
import { Home } from "./pages";

import "@styles/normalize.scss";
import "@styles/global.scss";

export const App: React.FC = () => {
    return (
        <div>
            <Home />
        </div>
    );
};