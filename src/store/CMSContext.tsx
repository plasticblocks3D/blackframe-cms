import { createContext, useContext, useState } from "react";


export type Page = {
  id: number;
  title: string;
  status: "Published" | "Draft";
};


type CMSContextType = {
  pages: Page[];
  addPage: (title: string) => void;
  deletePage: (id: number) => void;
};


const CMSContext = createContext<CMSContextType | null>(null);


export function CMSProvider({ children }: { children: React.ReactNode }) {

  const [pages, setPages] = useState<Page[]>([
    {
      id: 1,
      title: "Home",
      status: "Published",
    },
    {
      id: 2,
      title: "About",
      status: "Draft",
    },
    {
      id: 3,
      title: "Contact",
      status: "Published",
    },
  ]);


  function addPage(title: string) {

    const newPage: Page = {
      id: Date.now(),
      title,
      status: "Draft",
    };

    setPages([
      ...pages,
      newPage
    ]);
  }


  function deletePage(id: number) {

    setPages(
      pages.filter(
        page => page.id !== id
      )
    );

  }


  return (
    <CMSContext.Provider
      value={{
        pages,
        addPage,
        deletePage
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}



export function useCMS() {

  const context = useContext(CMSContext);

  if (!context) {
    throw new Error(
      "useCMS must be used inside CMSProvider"
    );
  }

  return context;

}