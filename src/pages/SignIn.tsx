import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useActionState } from "react"
import { z, ZodError} from "zod"
import { AxiosError, Axios } from "axios"
import { api } from "../services/api"

const signInScheme = z.object ({
    email: z.string().email({message: "Digite um email válido"}).trim(),
    password: z.string().trim().min(1, {message: "Informe uma senha"})
})  

export function SignIn(){
    
    const [state, formAction, isLoading] = useActionState(onAction, null)

    async function onAction(_: any, formData: FormData){
        try {

            const data = signInScheme.parse({
            email: formData.get("email"),
            password: formData.get("password")
            
        }) 

        const response = await api.post("/sessions", data)
        
        } catch (error) {
            if(error instanceof ZodError) return {message: error.issues[0].message}
            if(error instanceof AxiosError) return {message: error.response?.data.message}
            return {message: "Não foi possível fazer o login"} //state from useACtionState always catch the return
        }


    }

    return <form action={formAction} className="w-full flex flex-col gap-4"> {/*onSubmit in form just to trigger with Enter too*/}
        <Input name="email" required legend="E-mail" type="email" placeholder="seu@email.com"/>
        <Input name="password" required legend="Senha" type="password" placeholder="senha"/>
        <p className="text-sm text-red-600 text-center my-4 font-medium">{state?.message}</p>
        <Button type="submit" isLoading={isLoading}>Entrar</Button>
        <a href="/signup" className="text-sm font-semibold text-gray-100 mt-5 mb-4 text-center hover:text-green-800 transition ease-linear">Criar conta</a>
    </form>
}