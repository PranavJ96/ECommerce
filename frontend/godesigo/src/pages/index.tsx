import axios from 'axios'
import {Container} from '@nextui-org/react';
import HeaderComponent from "../components/common/header/header"
import FooterComponent from "../components/common/footer/footer"

// export const getStaticProps = async()=>{
//     const response = await axios.get("http://localhost:5000/products")
//     .then((res)=>{
//       if(res){
//         return res
//       }
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//     return {props:{response}}
// }
export default function Home() {
  return (
    <>
    <HeaderComponent/>
    <Container>
    <h1>Products will come here</h1>
    {/* {response.map((value, index)=>{
      return(
        <>
        <li>{value.name}</li>
        <li>{index}</li>
        </>
      )
    })} */}
    </Container>
    <FooterComponent/>
    </>
  )
}
