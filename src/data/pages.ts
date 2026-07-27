export type Page = {
  id: number;
  title: string;
  status: "Published" | "Draft";
};

export const pages: Page[] = [
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
];