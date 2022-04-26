import React from 'react';
import { createRoot } from 'react-dom/client';

import Options from './Options';
import './index.css';
import '../../public/styles/tailwind.css';

const root = createRoot(window.document.getElementById('root') as HTMLDivElement);

root.render(<Options title={'Settings'} />);

if (module.hot) module.hot.accept();
