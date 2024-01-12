import React, { useState, useMemo } from 'react';
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export function Assignment3() {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
        // Add more items as needed
    ]);

    function AddItem() {
        const itemName = document.getElementById('item').value;
        const itemPrice = parseInt(document.getElementById('price').value);
        if (itemName.length !== 0 && itemPrice > 0) {
            let item = {
                name: itemName,
                value: itemPrice
            };
            setItems(items => [...items, item]);
        }
    }


    // Your code starts here
    const totalValue = useMemo(() => {
        let price = 0;
        items.forEach(element => {
            price = price + element.value;
        });
        return price;

    }, [items]);





    // Your code ends here
    return (
        <div>
            <input id="item" type="text" placeholder='Item' /><br />
            <input id="price" type="number" placeholder='0' /><br />
            <button onClick={AddItem}>Add Item</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: {totalValue}</p>
        </div>
    )
};
