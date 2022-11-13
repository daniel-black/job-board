import { LayoutProps } from "../layout";
import { SearchForm } from "./SearchForm";

export default function SearchLayout(props: LayoutProps) {
  return (
    <div className="flex flex-row h-full w-full">
      <SearchForm />
      {props.children}
    </div>
  );
}