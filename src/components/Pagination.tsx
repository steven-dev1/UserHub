import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "./Button";
import type { PaginationProps } from "../types";

export const Pagination = ({ page,setPage,userLength }: PaginationProps) => {

  const totalPages = Math.ceil(userLength / 6);

  const handlePageClick = (page: number) => {
      console.log(totalPages, )
    if (page < 1 || page > 2) return;
    setPage(page);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-2 my-4">
        <div className="flex justify-center">
          <Button disabled={page === 1} onClick={() => handlePageClick(page - 1)}>
            <MoveLeft size={18} />
            <span className="hidden md:block">Atrás</span>
          </Button>
        </div>
        <div>
          <p className="text-sm text-gray-500">Página: {page}</p>
        </div>
        <div className="flex justify-center">
          <Button disabled={page === totalPages} onClick={() => handlePageClick(page + 1)}>
            <span className="hidden md:block">Siguiente</span>
            <MoveRight size={18} />
          </Button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">Total de usuarios: {userLength}</p>
      </div>
    </div>
  );
};
