// dtos = data transfer objects. Object transfer between front and backend

type UserAPIRole = "employee" | "manager"

type UserAPIResponse = {
    token: string,
    user: {
        id: string
        name: string
        email: string
        role: UserAPIRole
    }
}