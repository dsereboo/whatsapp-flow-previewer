"use client";
import { useState } from "react";

// type ButtonActions = "Failed" | "Submit" | "Validate";
// type ModalState ='success'|'failure'|'none'

interface CartItem {
  id: number;
  productImage: string;
  quantity: number;
  price: string;
}
export default function Lesson() {
  const cartItemsDefault: Array<CartItem> = [
    {
      id: 1,
      price: "USD 200",
      quantity: 1,
      productImage: "",
    },
    {
      id: 2,
      price: "USD 200",
      quantity: 1,
      productImage: "",
    },
    {
      id: 3,
      price: "USD 200",
      quantity: 1,
      productImage: "",
    },
  ];
  const [showSidePanel, setShowSidePanel] = useState(false);

  const [cartState, setCartState] = useState<Array<CartItem>>(cartItemsDefault);
  const [cartItemState, setCartItemState] = useState<CartItem | {}>({});

  const hanldeAddItemToCart = (id:number) => {
    const items = [];

    console.log(id,"id")
    //use id to pick form server state
    const itemToAdd =cartItemsDefault.filter((item)=>item.id===id)
    //add to my local cart state
    console.log(itemToAdd,"NEW ITEM")

    // const newItem:CartItem={price:"usd 200", productImage:"", quantity:200}

    setCartState([...cartState, ...itemToAdd]);

    //    setCartItemState({...cartItemState, quantity:2})
    //pick that particular item
    //add to state
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans">
      {/* <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-14 px-8 bg-white dark:bg-black sm:items-start"> */}
      {/* <h2>Trial</h2> */}
      <p>Cart Count: {cartState.length}</p>
      <div className="flex flex-row space-between space-x-5">
        {cartState.map((item) => {
          return (
            <article className="flex flex-1 flex-col">
              <p>{item.productImage}</p>
              <p>{item.price}</p>
              <button
                onClick={()=>hanldeAddItemToCart(item.id)}
                className="bg-green-500 text-white p-4 rounded-md hover:cursor-pointer"
              >
                Add to Cart
              </button>
            </article>
          );
        })}
      </div>

      {/* </main> */}
    </div>
  );
}

// export default fucntion DataPage(){

//     const [data,sset]
//     return(
//         <></>
//     )
// }
