import { Input } from "../components/Input"
import { Upload } from "../components/Upload"
import { Select } from "../components/Select"
import { Button } from "../components/Button"
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import fileSvg from "../assets/file.svg"
import {z, ZodError} from "zod"
import { AxiosError } from "axios"
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"
import { formatCurrency } from "../utils/formatCurrency"

const refundSchema = z.object ({
    name: z.string().min(3),
    category: z.string().min(1),
    amount: z.coerce.number().positive()
})

export function Refund () {

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [isLoad, setIsLoad] = useState(false)
    const [filename, setFilename] = useState<File | null>(null)
    const [fileURL, setFileURL] = useState<string | null>

    const navigate = useNavigate()
    const params = useParams<{id: string}>()

    async function onSubmit (e: React.FormEvent){
        e.preventDefault()

        if (params.id) return navigate(-1)
        
        try {

        setIsLoad(true)

        if(!filename) return alert("Adicione um arquivo de comprovante")

        const fileUploadForm = new FormData()
        fileUploadForm.append("file", filename)

        const response = await api.post("/uploads", fileUploadForm)

        console.log(response)
        
        const data = refundSchema.parse({name, category, amount: amount.replace(",",".")})
        
        await api.post("/refunds", {...data, filename: response.data.filename})
        navigate("/confirm", {state: {fromSubmit: true}})
        
        } catch (error) {
            if(error instanceof ZodError) return {message: error.issues[0].message}
            if(error instanceof AxiosError) return {message: error.response?.data.message}
            return {message: "Não foi possível fazer o login"} //state from useACtionState always catch the return
        } finally {setIsLoad(false)}

    }

    async function fetchRefund(id:string) {

        try {
        
            const response = await api.get<RefundAPIResponse>(`/refunds/${id}`)

            setName(response.data.name)
            setCategory(response.data.category)
            setAmount(formatCurrency(response.data.amount))
            setFileURL(response.data.filename)

        } catch (error) {
            if(error instanceof ZodError) return {message: error.issues[0].message}
            if(error instanceof AxiosError) return {message: error.response?.data.message}
            return {message: "Não foi possível fazer o login"} //state from useACtionState always catch the return
        } finally {setIsLoad(false)}

        
    }

    useEffect(() => {
        if(params.id){
            fetchRefund(params.id)
        }
    }, [params.id])

    return <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
        <header>
            <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>
            <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso</p>
        </header>

        <Input required legend="Nome da solicitação" value={name} onChange={(e) => setName(e.target.value)} disabled={!!params.id}/>

        <div className="flex gap-4">
            <Select required legend="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} disabled={!!params.id}>
                {CATEGORIES_KEYS.map((category) => 
                    <option key={category} value={category}>{CATEGORIES[category].name}</option>)
                }
            </Select>
            
            <Input legend="Valor" required value={amount} onChange={(e) => setAmount(e.target.value)} disabled={!!params.id}/>
        </div>

        {params.id && fileURL ? ( 
            <a href={`http://localhost:3333/uploads/${setFileURL}`} target="_blank" className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-75 transition ease-linear">
                <img src={fileSvg} alt="ícone de arquivo"/>
                Abrir comprovante
            </a> ) : ( 
                <Upload filename={filename && filename.name} onChange={(e) => e.target.files && setFilename(e.target.files[0])}/>
        )}

        <Button type="submit" isLoading={isLoad}> 
            {params.id ? "Voltar" : "Enviar"}
        </Button>

    </form>
}