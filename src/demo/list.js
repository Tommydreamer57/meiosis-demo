import React from 'react';

export default function createList(update) {

    return {
        view(model) {
            return (
                <div>
                    {model.listItems.map(item => (
                        <div key={item} >{item}</div>
                    ))}
                </div>
            );
        }
    };
}