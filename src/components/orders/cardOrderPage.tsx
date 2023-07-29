import { orderData } from "@/schemas/order.schema";
import Image from "next/image";
import { CardBasePage } from "../../styles/card";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";
import { useOrder } from "@/contexts/orderContext";

interface iCardOrderProps {
  order: orderData;
}

const CardOrderPage = ({ order }: iCardOrderProps) => {

  const router = useRouter()

  const { SetShowImgGallery} = useOrder()

  return (
    <CardBasePage>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />

      <div className="divOrderImg">
        <p>{order.date}</p>
        <h2>{order.code}</h2>
        {order.img !== null ? (
          <Image
            width={100}
            height={100}
            src={order.mockupImg}
            alt="Imagem de capa do pedido"
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

      <div className="divMockup" >
        <h3 >VER PRODUTOS:</h3>
          <button className="ButtonSeeMockup" onClick={SetShowImgGallery}>ABRIR</button>
  
      </div>

      <div className="divProductTitle">
        <h3>PRODUTO:</h3>
        <p >{order.product}</p>
      </div>

      <div className="divPrintType">
        <h3>TIPO:</h3>
        <p >{order.printType}</p>
      </div>
      
    </CardBasePage>
  );
};

export default CardOrderPage;
