import React, { useEffect } from "react";
import { useState } from "react";
// import FormModal from "../components/FormModal";
// import AddNote from "./AddNote/AddNote";

export interface INote {
  items: {
    id: number;
    title: string;
    content: string;
    username: string;
  }[];
}

function Home() {
  const [items, setItems] = useState<INote["items"]>(() => {
    const savedItems: any = localStorage.getItem("items");
    const items = JSON.parse(savedItems);
    return items || [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleDelete = (id: number) => {
    const filteredItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(filteredItems);
  };

  interface IProps {
    items: INote["items"];
  }

  const List: React.FC<IProps> = ({ items }) => {
    const renderList = (): JSX.Element[] => {
      return items?.map((item) => {
        return (
          <li key={item.id}>
            <div className="max-w-[300px] mx-auto sm:w-80 border border-2 border-green-100 rounded-br-[6px] rounded-bl-[6px] rounded-tr-[20px] shadow-lg">
              <div className="flex justify-between p-2 rounded-tr-[20px] text-white text-xl">
                {item.title}
                <button
                  className=" shadow transform transition ease-in-out duration-200 text-red-400 px-2 text-sm font-medium border-green-100 rounded-full border border-gray-500 hover:bg-white hover:text-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  X
                </button>
              </div>
              <div className="border-t text-gray-300 border-white p-2 rounded-br-[6px]] rounded-bl-[6px]">
                {item.content}
              </div>
            </div>
          </li>
        );
      });
    };
    return (
      <ul className="flex flex-col flex-wrap md:flex-row mx-auto max-w-5xl gap-3">
        {renderList()}
      </ul>
    );
  };

  return (
    <div className="App">
      <main className="text-slate-600 mt-4">
        <List items={items} />
      </main>
    </div>
  );
}

export default Home;
