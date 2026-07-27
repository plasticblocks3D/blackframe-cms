import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";


export type Page = {

  id: number;

  title: string;

  content: string;

  status: "Published" | "Draft";

};



type CMSContextType = {

  pages: Page[];

  addPage: (title:string)=>void;

  deletePage: (id:number)=>void;

  updatePage: (
    id:number,
    changes:Partial<Page>
  )=>void;

};



const defaultPages:Page[] = [

  {
    id:1,
    title:"Home",
    content:"Welcome to our website.",
    status:"Published"
  },


  {
    id:2,
    title:"About",
    content:"Learn more about us.",
    status:"Draft"
  },


  {
    id:3,
    title:"Contact",
    content:"Contact information goes here.",
    status:"Published"
  }

];



const CMSContext = createContext<CMSContextType | null>(null);



export function CMSProvider(
  {children}:{children:ReactNode}
){


  const [pages,setPages] = useState<Page[]>(()=>{


    const saved =
      localStorage.getItem(
        "blackframe-pages"
      );


    return saved
      ? JSON.parse(saved)
      : defaultPages;


  });



  /*
    Automatically save whenever pages change
  */

  useEffect(()=>{


    localStorage.setItem(
      "blackframe-pages",
      JSON.stringify(pages)
    );


  },[pages]);





  function addPage(title:string){


    const newPage:Page = {

      id:Date.now(),

      title,

      content:"",

      status:"Draft"

    };


    setPages([

      ...pages,

      newPage

    ]);


  }





  function deletePage(id:number){


    setPages(

      pages.filter(
        page=>page.id !== id
      )

    );


  }





  function updatePage(
    id:number,
    changes:Partial<Page>
  ){


    setPages(

      pages.map(page=>

        page.id === id

        ?

        {
          ...page,
          ...changes
        }

        :

        page

      )

    );


  }





  return (

    <CMSContext.Provider

      value={{

        pages,

        addPage,

        deletePage,

        updatePage

      }}

    >

      {children}

    </CMSContext.Provider>

  );


}






export function useCMS(){


  const context =
    useContext(CMSContext);



  if(!context){

    throw new Error(
      "useCMS must be used inside CMSProvider"
    );

  }


  return context;


}