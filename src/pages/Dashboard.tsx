import { Input } from "../components/Input"
import { useState, useEffect } from "react"
import searchSvg from "../assets/search.svg"
import { Button } from "../components/Button"
import { RefundItem, type RefundItemProps } from "../components/RefundItem"
import { CATEGORIES } from "../utils/categories"
import { Pagination } from "../components/Pagination"
import { formatCurrency } from "../utils/formatCurrency"
import { api } from "../services/api"
import { AxiosError } from "axios"
import { ZodError } from "zod"

const PER_PAGE = 2

export function Dashboard (){

    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [refunds, setRefunds] = useState<RefundItemProps[]>([]) // array of RefundItemProps

    async function fetchRefunds() {
        try {
            
            const response = await api.get<RefundsPaginationAPIResponse>(`/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`)

            setRefunds(response.data.refunds.map((refund) => ({
                id: refund.id,
                name: refund.user.name,
                description: refund.name,
                amount: formatCurrency(refund.amount),
                categoryImg: CATEGORIES[refund.category].icon,
            }))
        )
            
            setTotalPages(response.data.pagination.totalPages)

        } catch (error) {
            if(error instanceof ZodError) return {message: error.issues[0].message}
            if(error instanceof AxiosError) return {message: error.response?.data.message}
            return {message: "Não foi possível fazer o login"} //state from useACtionState always catch the return
        } 

    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        fetchRefunds()
    }

    function handlePagination (action: "next" | "previous"){
        setPage((prevPage) => {
            if (action === "next" && prevPage < totalPages) return prevPage + 1

            if (action === "previous" && prevPage > 1) return prevPage - 1

            return prevPage
        })
    }

    useEffect(() => {
        fetchRefunds()
    }, [page])

    return <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
        <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>
        <form onSubmit = {onSubmit} className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6">
            <Input placeholder="Pesquisar pelo nome" onChange={(e) => setName(e.target.value)}/>
            <Button variant="icon">
                <img src={searchSvg} alt="ícone de pesquisa" className="w-5" />
            </Button>
        </form>

        <div className="my-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
            {refunds.map((item) => (
                <RefundItem key={item.id} data={item} href={`/refund/${item.id}`}/> //every time .map-like need a Key
            ))}
            
        </div>

        <Pagination current={page} total={totalPages} onNext={() => handlePagination("next")} onPrevious={() => handlePagination("previous")}/>
    </div>
}