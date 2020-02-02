import React from 'react';

export const StoreDetails = ({storeDetails}) => {
    return (
        <div>
            <h3>{storeDetails.name}</h3>
            <ul>
                {
                    storeDetails.services.map((service) => {
                        return <li key={service}>{service}</li>
                    })
                }
            </ul>
        </div>
    )
}