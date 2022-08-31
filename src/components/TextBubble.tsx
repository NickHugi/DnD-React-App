import React from 'react';

import styles from './TextBubble.module.css';

type Props = {
    children: React.ReactNode
}

const TextBubble = (props: Props) => {
    return <span className={styles.bubble}>
            {props.children}
        </span>
}

export default TextBubble;