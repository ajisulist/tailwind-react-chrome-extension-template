import React from 'react';
import { createRoot } from 'react-dom/client';

import Panel from './Panel';
import './index.css';
import '../../public/styles/tailwind.css';

const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(<Panel />);

if (module.hot) module.hot.accept();
