import React from "react";
import PdfViewer from "./PdfViewer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useAuth } from "../hooks/AuthProvider";
const AccessPdf = () => {
  const userEmail = localStorage.getItem("siteUser");
  const [isPublic, setPublic] = useState(false);
  const { pdfId } = useParams();
  const checkAccess = async () => {
    const response = await axios.get(
      `https://pdf-share.onrender.com/api/pdf/getAccess`,
      {
        params: { id: pdfId },
      }
    );
    console.log(response)
    if(response.data.pdfFile.ownerEmail== JSON.parse(userEmail).email){
      console.log(response.data.owneremail)
      console.log(JSON.parse(userEmail).email)
      setPublic(true)
    }
    else if(response.data.pdfFile.sharedWith.includes(JSON.parse(userEmail).email)){
      setPublic(true)
    }
    else if(response.data.pdfFile) {
      setPublic(response.data.pdfFile.isPublic);
    }
    console.log(response);
  };
  useEffect(() => {
    checkAccess();
  }, []);

  console.log(pdfId);
  return (
    <>
      <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="">PDFCollab</span>
      </Link>
      {isPublic ? (
        <div className="w-[50vw] ml-[25vw] pl-25">
          <PdfViewer fileId={pdfId} />
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-center mt-[40vh]">
          You dont have access to view th file
        </h1>
      )}
    </>
  );
};

export default AccessPdf;
