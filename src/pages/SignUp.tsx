import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react"
import {z, ZodError} from "zod"
import { AxiosError } from "axios"
import { api } from "../services/api.ts"
import { useNavigate } from "react-router"

const signUpSchema = z.object ({
    email: z.email({message: "E-mail inválido"}).trim(),
    name: z.string().trim().min(1, {message: "Informe um nome"}),
    password: z.string().min(6, {message: "Informe uma senha de mínimo de 6 caracteres"}),
    passwordConfirm: z.string({message: "Confirme a senha"}),
}).refine((data) => data.password === data.passwordConfirm, {message: "Senhas não concidem", path: ["passConfirm"]})

export function SignUp(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [passwordConfirm, setPassConfirm] = useState("")
    const [load, setIsLoad] = useState(false)

    const nav = useNavigate()

    async function onSubmit(e: React.FormEvent){
        e.preventDefault()

        try {
            setIsLoad(true)
            const data = signUpSchema.parse({
                email,
                name,
                password,
                passwordConfirm
            })

        await api.post("/users", data)

        if (confirm("Cadastrado com sucesso. Ir para a tela de login?")) nav("/")

        } catch (error) {
            if(error instanceof ZodError) return alert(error.issues[0].message)
            if(error instanceof AxiosError) return alert(error.response?.data.message)
            alert("Não foi possível cadastrar")
        } finally {
            setIsLoad(false)
        }
    }

    return <form onSubmit={onSubmit} className="w-full flex flex-col gap-4"> {/*onSubmit in form just to trigger with Enter too*/}
        <Input required legend="E-mail" type="email" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)}/>
        <Input required legend="Name" placeholder="nome" onChange={(e) => setName(e.target.value)}/>
        <Input required legend="Senha" type="password" placeholder="senha" onChange={(e) => setPass(e.target.value)}/>
        <Input required legend="Confirmação da senha" type="password" placeholder="senha" onChange={(e) => setPassConfirm(e.target.value)}/>
        <Button type="submit" isLoading={load}>Criar conta</Button>
        <a href="/" className="text-sm font-semibold text-gray-100 mt-5 mb-4 text-center hover:text-green-800 transition ease-linear">Já tenho uma conta</a>
    </form>
}