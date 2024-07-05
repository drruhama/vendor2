'use client'
import { usePathname, useSearchParams, useRouter } from "next/navigation"
//import { useRouter } from "next/router";
import { IoSearch } from "react-icons/io5"
import { useDebouncedCallback } from "use-debounce"

const Search = () => {
  const strQryPar = useSearchParams();
  const location = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((par: string) => {
   console.log(par);
   const isiQry = new URLSearchParams(strQryPar);
   isiQry.set("page", "1");
   if (par) {
    isiQry.set("query", par);
   } else {
    isiQry.delete("query");
   }
   replace(`${location}?${isiQry.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1">
      <input type="text" className="w-full border border-gray-200 py-1 pl-10 text-sm outline-2 rounded-sm" placeholder="Search..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={strQryPar.get("query")?.toString()}
      />
      <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
    </div>
  )
}

export default Search;