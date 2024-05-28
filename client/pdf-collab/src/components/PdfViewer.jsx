import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";

const PdfViewer = ({ fileId, user }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isCommentPanelOpen, setCommentPanelOpen] = useState(false);
  const [comments, setComments] = useState([]); // Track comments
  const [comment, setComment] = useState("");

  // Function to toggle comment panel
  const toggleCommentPanel = () => {
    setCommentPanelOpen(!isCommentPanelOpen);
  };

  // Function to handle submitting a comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/pdf/addComments",
        {
          pdfFileId: fileId,
          userEmail: user,
          commentText: comment,
        }
      );
    } catch (error) {
      console.error("PDF upload error:", error);
    }
    getComments();
  };
  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };
  const getComments=async ()=>{
    const comments = await axios.get(
        "http://localhost:3001/api/pdf/getComments",
        { params: { id: fileId } }
      );
      console.log(comments);
      setComments(comments.data.comments);
  }
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const fetchPdfBlob = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/pdf/getPdf",
          { params: { id: fileId }, responseType: "blob" }
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch PDF");
        }

        const blob = response.data;
        console.log(blob);
        console.log(response);
        setPdfBlob(blob);
        getComments();
        // var blobURL = URL.createObjectURL(blob);
        // window.open(blobURL);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdfBlob();
  }, [fileId]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageChange = ({ pageNumber }) => {
    setPageNumber(pageNumber);
  };

  return (
    <div className="relative h-[80vh] overflow-auto">
      <div className="flex justify-between w-full">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={handleNextPage} disabled={pageNumber === numPages}>
          Next
        </button>
        <button
          onClick={toggleCommentPanel}
          className="bg-gray-900 text-white text-sm p-2 mr-2 rounded"
        >
          Discussion
        </button>
      </div>
      {pdfBlob && (
        <div className=" overflow-auto">
          <Document file={pdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={500} height={50} />
          </Document>
        </div>
      )}
      {isCommentPanelOpen && (
        <div className="absolute top-0 right-0 p-4 bg-white border shadow-lg">
          {/* Your comment input form */}
          <form onSubmit={handleSubmitComment} className="flex">
            <textarea
              className="p-2 border outline-none"
              placeholder="Write your comment here..."
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 h-10 my-4 mx-2 text-white px-2 rounded-md text-sm"
            >
              Submit
            </button>
          </form>
          {/* Display existing comments */}
          <div>
          {comments.map((comment, index) => (
    <div key={index} className="comment">
      <div className="comment-header">
      <div className="comment-text">{comment.commentText}</div>
        <span className="comment-user">{comment.userEmail}{" "}</span>
        <span className="comment-time">{new Date(comment.createdAt).toLocaleString()}</span>
      </div>
      
    </div>
  ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
