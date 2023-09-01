import React from 'react'
import { createBoard } from '@wixc3/react-board';
import Page from '../../app/page';

export default createBoard({
    name: 'Select Game',
    Board: () => <div>
        <Page />
    </div>,
    isSnippet: true,
    environmentProps: {
        windowWidth: 725,
        windowHeight: 667,
        windowBackgroundColor: '#325ab8'
    }
});
