import React from 'react';

export default function createInput(update) {

    function onKeyDown({ target, key }) {
        if (key === "Enter") {
            update(model => ({
                ...model,
                listItems: [...model.listItems, target.value]
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