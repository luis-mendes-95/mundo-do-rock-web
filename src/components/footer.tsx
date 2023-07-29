import { useAuth } from "@/contexts/authContext";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import { FooterBase } from "@/styles/footer";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";

const Footer = () => {

  const { showLogoutButton, logout, user } = useAuth();
  const { SetShowFilterModal, showFinancesButton, setShowFinances } = useServiceOrder()
  const router = useRouter();

  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
      <FooterBase>

        
       <section className="sectionAvaliation">
        <ul>
          <li>
            <h3>Juquinha de Oliveira</h3>
            <span>27/03/2023</span>
            <span>Lages - SC</span>
            <p>X X X X X</p>
            <p>Loja top!!! Sou suspeito em dizer pois compro todo mês pessoalmente!!! Mas mesmo viajando comprei pelo site pois
              recebi um maravilhoso cupom de descontooooo!! Eu amo o mundo do rock!! s2 s2 s2 
            </p>
          </li>
        </ul>
       </section>

      <section className="sectionGeneralInfo">
        <ul>

          <li className="liAtendimento">
            <p>Logo</p>
            <div>
              <h3>ATENDIMENTO</h3>
              <p> Seg à Sex das 9h-12h e das 14h-19h</p>
            </div>
          </li>

          <li className="liDevolution">
            <p>Logo</p>
            <div>
              <h3>TROCAS E DEVOLUÇÕES</h3>
              <p>Até 7 dias para trocas e devoluções</p>
            </div>
          </li>

          <li className="liShipment">
            <p>Logo</p>
            <div>
              <h3>FRETE</h3>
              <p>Frete Grátis acima de R$ 199,00 para Sul e Sudeste</p>
            </div>
          </li>

          <li className="liPayment">
            <p>Logo</p>
            <div>
              <h3>PARCELAMENTO</h3>
              <p>Em até 12x no cartão</p>
            </div>
          </li>

        </ul>
      </section>


      </FooterBase>
    </>
  );
};

export default Footer;
