import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../public/styles/tailwind.css';

import Newtab from './Newtab';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(<Newtab />);

if (module.hot) module.hot.accept();
