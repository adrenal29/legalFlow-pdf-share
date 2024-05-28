import React from 'react'
import PdfViewer from './PdfViewer'
import { useParams } from 'react-router-dom';

const AccessPdf = () => {
  const { pdfId } = useParams();
  console.log(pdfId)
  return (
    <div>
        <PdfViewer fileId={pdfId} user={null}/>
    </div>
  )
}

export default AccessPdf