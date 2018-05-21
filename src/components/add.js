import React from 'react';

export default function createAdd(update) {
    function onKeyDown({ target, key }) {
        if (key === 'Enter') {
            update(model => ({
                ...model,
                list: [...model.list, target.value]
            }));
            target.value = '';
        }
    }
    return {
        view(model) {
            return (
                <input onKeyDown={onKeyDown} />
            );
        }
    };
}
