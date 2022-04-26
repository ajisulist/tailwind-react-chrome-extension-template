import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../public/styles/tailwind.css';

import Popup from './Popup';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<Popup />);

if (module.hot) module.hot.accept();
