import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [product, setProduct] = useState({
    id: 0,
    title: "",
    price: "",
  });

  const [products, setProducts] = useState([]);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((result) => {
        setProducts(result.data.products);
      });
  }, []);

  const OnTextChange = (args) => {
    const copyOfProduct = { ...product };

    copyOfProduct[args.target.name] = args.target.value;

    setProduct(copyOfProduct);
  };

  
  const AddRecord = () => {

    if (product.title === "" || product.price === "") {
      alert("Add Data First !!");
      return;
    }

    const copyOfProducts = [...products];

    copyOfProducts.push({ ...product });

    setProducts(copyOfProducts);

    setProduct({
      id: 0,
      title: "",
      price: "",
    });
  };

  
  const Edit = (productToBeEdited) => {
    setEdit(true);
    setProduct(productToBeEdited);
  };

  
  const Remove = (productToBeRemoved) => {

    const isConfirm = confirm(
      `Confirm Deletion of ID ${productToBeRemoved.id}`
    );

    if (!isConfirm) return;

    const filteredArray = products.filter(
      (p) => p.id !== productToBeRemoved.id
    );

    setProducts(filteredArray);
  };

  
  const UpdateRecord = () => {

    const copyOfProducts = [...products];

    copyOfProducts.forEach((p) => {

      if (p.id == product.id) {
        p.title = product.title;
        p.price = product.price;
      }

    });

    setEdit(false);
    setProducts(copyOfProducts);

    setProduct({
      id: 0,
      title: "",
      price: "",
    });
  };

  console.log("like render..");

  return (
    <div className="container mx-auto mt-[100px] px-4">

     
      <div className="overflow-x-auto mb-2">

        <table className="w-full border border-gray-300 rounded-xl overflow-hidden">

          <tbody>

         
            <tr className="border-b border-gray-300">

              <td className="p-3 font-semibold bg-gray-100 w-[150px]">
                ID
              </td>

              <td className="p-3">
              {isEdit?
                <input
                  type="text"
                  name="id"
                  value={product.id}
                  onChange={OnTextChange}
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500" disabled
                />: <input
                  type="text"
                  name="id"
                  value={product.id}
                  onChange={OnTextChange}
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500"
                />}

              </td>

            </tr>

        
            <tr className="border-b border-gray-300">

              <td className="p-3 font-semibold bg-gray-100">
                Title
              </td>

              <td className="p-3">

                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={OnTextChange}
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500"
                />

              </td>

            </tr>

      
            <tr className="border-b border-gray-300">

              <td className="p-3 font-semibold bg-gray-100">
                Price
              </td>

              <td className="p-3">

                <input
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={OnTextChange}
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500"
                />

              </td>

            </tr>

        
            <tr>

              {!isEdit ? (

                <td className="p-3 w-xl">

                  <button
                    onClick={AddRecord}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Add Product
                  </button>

                </td>

              ) : (

                <td className="p-3 w-xl">

                  <button
                    onClick={UpdateRecord}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Update Product
                  </button>

                </td>

              )}

            </tr>

          </tbody>

        </table>

      </div>

      <hr className="my-8 border-gray-300" />



      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3">
                Edit
              </th>

              <th className="p-3">
                Delete
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((p) => {

              return (

                <tr
                  key={p.id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >

                  <td className="p-3">
                    {p.id}
                  </td>

                  <td className="p-3">
                    {p.title}
                  </td>

                  <td className="p-3">
                    {p.price}
                  </td>

                  <td className="p-3 text-center">

                    <button
                      onClick={() => Edit(p)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>

                  </td>

                  <td className="p-3 text-center">

                    <button
                      onClick={() => Remove(p)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Home;