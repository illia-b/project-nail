import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { FightBuilder } from '../../app/(games)/shadow-chaser/components/fight/fight-builder';

export default createBoard({
    name: 'Fight Builder',
    Board: () => <><FightBuilder /></>,
    isSnippet: true,
    environmentProps: {
        windowBackgroundColor: '#d9d9d9'
    }
});
