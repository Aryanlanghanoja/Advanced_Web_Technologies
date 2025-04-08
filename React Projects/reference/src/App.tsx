import type React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import ProfilePage from "./ProfilePage"
import type { User } from "./types/User"

const App: React.FC = () => {
  const sampleUser: User = {
    id: "1",
    type: "admin",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15",
    profileImage: "/placeholder.svg?height=150&width=150",
    accessLevel: "Full Access",
  }

  return (
    <div className="App">
      <ProfilePage user={sampleUser} />
    </div>
  )
}

export default App