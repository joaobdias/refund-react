import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react"

export function SignUp(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [passConfirm, setPassConfirm] = useState("")
    const [load, setIsLoad] = useState(false)

    function onSubmit(e: React.FormEvent){
        e.preventDefault()
    }

    return <form onSubmit={onSubmit} className="w-full flex flex-col gap-4"> {/*onSubmit in form just to trigger with Enter too*/}
        <Input required legend="E-mail" type="email" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)}/>
        <Input required legend="Name" placeholder="nome" onChange={(e) => setName(e.target.value)}/>
        <Input required legend="Senha" type="password" placeholder="senha" onChange={(e) => setPass(e.target.value)}/>
        <Input required legend="Confirmação da senha" type="password" placeholder="senha" onChange={(e) => setPass(e.target.value)}/>
        <Button type="submit" isLoading={load}>Criar conta</Button>
        <a href="/" className="text-sm font-semibold text-gray-100 mt-5 mb-4 text-center hover:text-green-800 transition ease-linear">Já tenho uma conta</a>
    </form>
}