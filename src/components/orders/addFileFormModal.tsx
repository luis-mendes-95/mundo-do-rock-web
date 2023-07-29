import { useState } from "react";
import { useOrders } from "@/contexts/ordersContext";
import Modal from "../modal";
import { OrderData } from "@/schemas/Order.schema";
import { toast } from "react-toastify";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Image from "next/image";

interface iCardOrderProps {
  order: orderData;
}

const AddFileFormModal = ({ order }: iCardOrderProps) => {

  const { SetShowFileModal } = useOrder();

  const [files, setFiles] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const cookies = parseCookies();

  const token = cookies["mundodorock.token"];

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    const filesArray = Array.from(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const onFileFormSubmit = async () => {

    if (files.length === 0) {
      toast.error("Selecione pelo menos um arquivo.");
      return;
    }

    setUploading(true);

    const downloadLinks = await uploadFilesToServer(files);

    const filesString = downloadLinks.join("                        ");

    const requestBody = {
      client: order.client,
      files: `${filesString}                        ${order.files}`,
    };

    const requestUrl = `orders/${order.id}`;

    try {
      const response = await api.patch(requestUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        SetShowFileModal();

        toast.success("Arquivos enviados com sucesso!")

        router.push(`/${order.id}`);
      } else {
        toast.error("Ocorreu um erro ao adicionar os arquivos.");
      }
    } catch (error) {
      console.error("Erro ao adicionar os arquivos:", error);
      toast.error("Ocorreu um erro ao adicionar os arquivos.");
    }

    setUploading(false);
  };

  async function uploadFilesToServer(files: any) {

    let links: any = []

    try {
      const formData = new FormData();
      files.forEach((file: any) => {
        formData.append("files", file);
      });

      const response = await api.post("orders/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {

        return response.data;

      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }

    return []
  }


  return (
    <Modal>
      {
        !uploading &&
        <h2>Adicionar Arquivos</h2>
      }

      {!uploading &&
        <input type="file" multiple onChange={onFileInputChange} />
      }
      {
        uploading &&
        <>
          <p>Aguarde os arquivos serem enviados.</p>
          <Image
            src="https://media.giphy.com/media/r3xBH1FXWz0h55CVtj/giphy.gif"
            alt="Loading"
            width={100}
            height={100}
          />
        </>
      }
      <div>
        <button onClick={SetShowFileModal} className="buttonCancel">
          Voltar
        </button>
        <button className="buttonSave" onClick={onFileFormSubmit} disabled={uploading}>
          Salvar
        </button>
      </div>

      <style jsx>{`
        .buttonSave {
          font-size: ${uploading ? "6pt" : "inherit"};
        }
      `}</style>






    </Modal>
  );
};

export default AddFileFormModal;
