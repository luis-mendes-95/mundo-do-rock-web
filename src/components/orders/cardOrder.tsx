import { orderData } from "@/schemas/order.schema";
import Image from "next/image";
import { CardBase } from "../../styles/card";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";

interface iCardOrderProps {
  order: orderData;
}

const CardOrder = ({ order }: iCardOrderProps) => {

  const router = useRouter()

  return (
    <CardBase onClick={()=>{router.push(`${order.id}`)}}>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />

      <div className="divOrderImg">
      <p>{order.date}</p>
        <h2 className="h2OrderTitle">{order.client}</h2>
        {order.img !== null ? (
          <Image
            width={100}
            height={100}
            src={order.mockupImg}
            alt="Imagem do produto"
            style={{ borderRadius: "50%", border: "2.5pt solid orange", height:"80px", maxWidth: "80px"}}
          />
        ) : (
          <div className="noImage">...</div>
        )}
      </div>

      <div className="divStatus">
        <h3>STATUS:</h3>
        {order.status === "EM SEPARAÇÃO" && <p className="noStock">{order.status}</p>}
        {order.status === "A CAMINHO" && <p className="onRoad">{order.status}</p>}
        {order.status === "ENTREGUE" && <p className="finished">{order.status}</p>}
        
      </div>

      <div className="divProductTitle">
        <h3>PRODUTOS:</h3>
        <ul>
          <li>product 1</li>
          <li>product 2</li>
        </ul>
      </div>
    </CardBase>
  );
};

export default CardOrder;
