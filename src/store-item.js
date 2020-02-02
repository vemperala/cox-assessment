import React from 'react';

export const StoreItem = ({store, handleSelection}) => {
    const handleClick = () => {
        handleSelection(store);
    }

    return (
        <li onClick={handleClick}>{store.name} {store.address}</li>
    )
}