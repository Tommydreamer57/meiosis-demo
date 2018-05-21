import React from 'react';

export default function createList(update) {
    return {
        view(model) {
            return (
                <div id="list" >
                    {model.list.map(item => (
                        <div key={item} >{item}</div>
                    ))}
                </div>
            );
        }
    };
}
