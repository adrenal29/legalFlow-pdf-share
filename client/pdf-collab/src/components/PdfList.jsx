import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/AuthProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner"
const PdfList = ({ setSelectedFileId }) => {
  const auth = useAuth();
  const [userEmail, setUserEmail] = useState(auth.getCurrentUserEmail());

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareEmail, setShareEmail] = useState("");

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const userEmail = localStorage.getItem("siteUser");

        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/pdf/getPdfs?email=${
            JSON.parse(userEmail).email
          }`
        );
        console.log(response.data);
        setPdfs(response.data.pdfs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const handleShare = async (e, pdfFileId) => {
    e.preventDefault();
    const shareEmail = e.target.elements.email.value;
    const response = await axios.post(
      `http://localhost:3001/api/pdf/addUser?pdfId=${pdfFileId}`,
      {
        shareEmail,
      }
    )
    toast.success("File shared successfully")
    e.target.reset();
  };
  const handlePublicShare = async (e, pdfFileId) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:3001/api/pdf/share-publicly?pdfId=${pdfFileId}`
    );
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Your PDFs</h2>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {pdfs.map((pdf) => (
            <li key={pdf._id} className="py-4">
              <div className="flex items-center space-x-4">
                <svg
                  id="svg"
                  fill="#000000"
                  stroke="#000000"
                  width="25px"
                  height="25px"
                  version="1.1"
                  viewBox="144 144 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="IconSvg_bgCarrier" stroke-width="0"></g>
                  <g
                    id="IconSvg_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                  ></g>
                  <g id="IconSvg_iconCarrier">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path d="m457.43 387.4h-143.59c-2.5195 0-4.5352 2.0156-4.5352 4.5352s2.0156 4.5352 4.5352 4.5352h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352s-2.0156-4.5352-4.5352-4.5352z" />
                      <path d="m313.85 432.24h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352s-2.0156-4.5352-4.5352-4.5352h-143.59c-2.5195 0-4.5352 2.0156-4.5352 4.5352s2.0156 4.5352 4.5352 4.5352z" />
                      <path d="m457.43 457.94h-143.08c-2.5195 0-4.5352 2.0156-4.5352 4.5352 0 2.5195 2.0156 4.5352 4.5352 4.5352h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352 0-2.5195-2.0156-4.5352-5.0391-4.5352z" />
                      <path d="m457.43 493.2h-143.08c-2.5195 0-4.5352 2.0156-4.5352 4.5352s2.0156 4.5352 4.5352 4.5352h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352s-2.0156-4.5352-5.0391-4.5352z" />
                      <path d="m457.43 528.47h-143.59c-2.5195 0-4.5352 2.0156-4.5352 4.5352 0 2.5195 2.0156 4.5352 4.5352 4.5352h143.59c2.5195 0 4.5352-2.0156 4.5352-4.5352 0-2.5195-2.0156-4.5352-4.5352-4.5352z" />
                      <path d="m537.04 292.18c0-41.312-33.754-75.066-75.066-75.066-29.727 0-54.914 17.129-67.512 41.816h-39.297c-1.0078 0-2.5195 0.50391-3.5273 1.5117l-82.121 82.117c-1.0078 1.0078-1.5117 2.0156-1.5117 3.5273v236.79h234.77l0.003906-227.72c20.656-13.605 34.258-36.777 34.258-62.977zm-186.41-17.129v66h-66zm142.58 297.75h-215.12v-222.18h77.586c2.5195 0 4.5352-2.0156 4.5352-4.5352v-78.09h30.73c-2.5195 7.5586-4.0312 15.617-4.0312 23.68 0 41.312 33.754 75.066 75.066 75.066 11.082 0 21.664-2.5195 31.234-7.0547zm-31.234-215.12c-36.273 0-65.496-29.223-65.496-65.496 0-36.273 29.223-65.496 65.496-65.496s65.496 29.223 65.496 65.496c-0.003906 36.273-29.223 65.496-65.496 65.496z" />
                      <path d="m500.76 262.46c-2.0156-1.5117-5.0391-1.0078-6.5508 1.0078l-35.77 48.871-23.68-31.234c-1.5117-2.0156-4.5352-2.5195-6.5508-1.0078-2.0156 1.5117-2.5195 4.5352-1.0078 6.5508l27.711 36.273 0.50391 0.50391h0.50391 0.50391 1.0078 0.50391 0.50391 0.50391 0.50391 0.50391 0.50391l0.50391-0.50391 40.809-53.91c1.5117-2.0156 1.0078-5.0391-1.0078-6.5508z" />
                    </g>
                  </g>
                </svg>
                <div
                  className="flex-1 min-w-0"
                  onClick={() => setSelectedFileId(pdf.uploadPdfId)}
                >
                  <p className="text-sm font-medium text-gray-900 truncate cursor-pointer hover:text-blue-500">
                    {pdf.fileName}
                  </p>
                </div>
                <div className="cursor-pointer">
                  <a href={`/pdf/${pdf.uploadPdfId}`}>
                <svg enable-background="new 0 0 141.732 141.732" height="30.732px" id="Livello_1" version="1.1" viewBox="0 0 141.732 141.732" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Livello_107"><path d="M57.217,63.271L20.853,99.637c-4.612,4.608-7.15,10.738-7.15,17.259c0,6.524,2.541,12.653,7.151,17.261   c4.609,4.608,10.74,7.148,17.259,7.15h0.002c6.52,0,12.648-2.54,17.257-7.15L91.738,97.79c7.484-7.484,9.261-18.854,4.573-28.188   l-7.984,7.985c0.992,4.667-0.443,9.568-3.831,12.957l-37.28,37.277l-0.026-0.023c-2.652,2.316-6.001,3.579-9.527,3.579   c-3.768,0-7.295-1.453-9.937-4.092c-2.681-2.68-4.13-6.259-4.093-10.078c0.036-3.476,1.301-6.773,3.584-9.39l-0.021-0.02   l0.511-0.515c0.067-0.071,0.137-0.144,0.206-0.211c0.021-0.021,0.043-0.044,0.064-0.062l0.123-0.125l36.364-36.366   c2.676-2.673,6.23-4.144,10.008-4.144c0.977,0,1.947,0.101,2.899,0.298l7.993-7.995c-3.36-1.676-7.097-2.554-10.889-2.554   C67.957,56.124,61.827,58.663,57.217,63.271 M127.809,24.337c0-6.52-2.541-12.65-7.15-17.258c-4.61-4.613-10.74-7.151-17.261-7.151   c-6.519,0-12.648,2.539-17.257,7.151L49.774,43.442c-7.479,7.478-9.26,18.84-4.585,28.17l7.646-7.646   c-0.877-4.368,0.358-8.964,3.315-12.356l-0.021-0.022l0.502-0.507c0.064-0.067,0.134-0.138,0.201-0.206   c0.021-0.02,0.04-0.04,0.062-0.06l0.126-0.127l36.363-36.364c2.675-2.675,6.231-4.147,10.014-4.147   c3.784,0,7.339,1.472,10.014,4.147c5.522,5.521,5.522,14.51,0,20.027L76.138,71.629l-0.026-0.026   c-2.656,2.317-5.999,3.581-9.526,3.581c-0.951,0-1.891-0.094-2.814-0.278l-7.645,7.645c3.369,1.681,7.107,2.563,10.907,2.563   c6.523,0,12.652-2.539,17.261-7.148l36.365-36.365C125.27,36.988,127.809,30.859,127.809,24.337"/></g><g id="Livello_1_1_"/></svg>
                </a>
                </div>
                <Dialog>
                  <DialogTrigger>
                    {" "}
                    <button className="bg-gray-900 text-sm p-2 text-white rounded">
                      Share
                    </button>{" "}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="my-2">
                        Share pdf with other users
                      </DialogTitle>
                      <DialogDescription>
                        <form
                          onSubmit={(e) => {
                            handleShare(e, pdf.uploadPdfId);
                          }}
                          className=""
                        >
                          <input
                            className="w-full outline-none py-1 border border-gray-400 px-1 rounded-md"
                            type="email"
                            placeholder="Enter user email"
                            name="email"
                          />
                          <button
                            type="submit"
                            className="bg-gray-900 text-white px-2 py-2 my-2 rounded-md"
                          >
                            Share
                          </button>
                        </form>
                        <h2 className="text-center">OR</h2>
                        <button
                          className="bg-indigo-700 text-white px-2 py-2 my-2 rounded-md w-1/3"
                          onClick={(e) => handlePublicShare(e, pdf.uploadPdfId)}
                        >
                          Share publicly
                        </button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PdfList;
