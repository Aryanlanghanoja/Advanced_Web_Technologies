export interface User {
    id: string
    type: "admin" | "employee" | "marketingAgency"
    name: string
    email: string
    phone: string
    joinDate: string
    profileImage?: string
    accessLevel?: string
    department?: string
    agencyName?: string
}