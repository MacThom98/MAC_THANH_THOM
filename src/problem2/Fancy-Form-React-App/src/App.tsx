import "./App.css";
import { AppNavbar } from "./components/AppNavbar";
import { SwapForm } from "./components/SwapForm";
import { useFetch } from "./hook/useFetch";

export interface Token {
  currency: string;
  date: Date;
  price: number;
}

const token_api = import.meta.env.VITE_TOKEN_PRICE_JSON;

function App() {
  const { data: tokens, loading, error } = useFetch<Token[]>(token_api);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Errors</div>;
  }
 
  return tokens && (
    <div className="container" >
      <AppNavbar />
      <SwapForm tokens={tokens}/>  
      
    </div>
  );
}

export default App;
