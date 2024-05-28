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
    );
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
