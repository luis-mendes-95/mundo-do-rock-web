import { useState } from "react";
import { useOrder } from "@/contexts/orderContext";
import Modal from "../modal";
import { orderData } from "@/schemas/order.schema";
import { toast } from "react-toastify";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

interface iCardOrderProps {
  order: orderData;
}

const AddInstructionFormModal = ({ order }: iCardOrderProps) => {

  const { SetShowInstructionModal, getAllOrders } = useOrder();
  const [instruction, setInstruction] = useState("");
  const router = useRouter()

  const cookies = parseCookies();
  const token = cookies["printsquad.token"];

  const onSave = async () => {
    const formData = {
      client: order.client,
      description: `${instruction} ||| ${order.description}`,
      status: "AGUARDANDO ARTE"
    };

    try {
      const response = await api.patch(`orders/${order.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Instrução de arte adicionada com sucesso!");
        SetShowInstructionModal()
        getAllOrders()
        router.push(`/${order.id}`)
      } else {
        toast.error("Ocorreu um erro ao adicionar a instrução de arte.");
      }
    } catch (error) {
      console.error("Erro ao adicionar a instrução de arte:", error);
      toast.error("Ocorreu um erro ao adicionar a instrução de arte.");
    }
  };

  return (
    <Modal>
      <h2>Adicionar Instrução de Arte</h2>
      <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} />
      <div>
        <button onClick={SetShowInstructionModal} className="buttonCancel">
          Voltar
        </button>
        <button className="buttonSave" onClick={onSave}>
          Salvar
        </button>
      </div>
    </Modal>
  );
};

export default AddInstructionFormModal;
