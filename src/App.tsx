import { Moon} from "lucide-react"
import { UserList } from "./components/UserList"

function App() {
  return (
    <main className="flex dark: max-w-[1024px] w-full m-4 mx-auto flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">UserHub</h1>
        <button className="bg-gray-200 p-2 rounded-lg cursor-pointer "><Moon /></button>
      </div>
      <UserList />
    </main>
  )
}

export default App
