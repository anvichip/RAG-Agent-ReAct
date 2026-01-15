// import React from 'react';
// import { ChatContainer } from '../components/chat/ChatContainer';
// import { PDFList } from '../components/pdf/PDFList';
// import { PDFViewer } from '../components/pdf/PDFViewer';
// import { VectorDBStatus } from '../components/database/VectorDBStatus';
// import { useChat } from '../hooks/useChat';
// import { usePDF } from '../hooks/usePDF';

// export const ChatPage = () => {
//   const { messages, loading: chatLoading, sendMessage, messagesEndRef } = useChat();
//   const { pdfs, selectedPdf, setSelectedPdf, loading: pdfLoading, ingestPDF, deletePDF } = usePDF();

//   return (
//     <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)]">
//       <div className="col-span-3 space-y-4 overflow-y-auto">
//         <PDFList
//           pdfs={pdfs}
//           selectedPdf={selectedPdf}
//           onSelect={setSelectedPdf}
//           onUpload={ingestPDF}
//           onDelete={deletePDF}
//           loading={pdfLoading}
//         />
//         <VectorDBStatus documentCount={pdfs.length} selectedPdf={selectedPdf} />
//         <PDFViewer pdf={selectedPdf} />
//       </div>
//       <ChatContainer
//         messages={messages}
//         loading={chatLoading}
//         onSend={sendMessage}
//         messagesEndRef={messagesEndRef}
//       />
//     </div>
//   );
// };

import React from "react";

import { ChatContainer } from "../components/chat/ChatContainer";
import { PDFList } from "../components/pdf/PDFList";
// import { PDFViewer } from "../components/pdf/PDFViewer";
import PDFViewer from "../components/pdf/PDFViewer";
import { VectorDBStatus } from "../components/database/VectorDBStatus";

import useChat from "../hooks/useChat";
import usePDF from "../hooks/usePDF";

export default function ChatPage() {
  const { messages, loading: chatLoading, sendMessage, messagesEndRef } = useChat();
  const { pdfs, selectedPdf, setSelectedPdf, loading: pdfLoading, ingestPDF, deletePDF } = usePDF();

// import React from "react";
// import ChatContainer from "../components/chat/ChatContainer";
// import PDFList from "../components/pdf/PDFList";
// import PDFViewer from "../components/pdf/PDFViewer";
// import VectorDBStatus from "../components/database/VectorDBStatus";
// import useChat from "../hooks/useChat";
// import usePDF from "../hooks/usePDF";

// export default function ChatPage() {
//   const { messages, loading: chatLoading, sendMessage, messagesEndRef } = useChat();
//   const { pdfs, selectedPdf, setSelectedPdf, loading: pdfLoading, ingestPDF, deletePDF } = usePDF();

  return (
    <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)]">
      <div className="col-span-3 space-y-4 overflow-y-auto">
        <PDFList
          pdfs={pdfs}
          selectedPdf={selectedPdf}
          onSelect={setSelectedPdf}
          onUpload={ingestPDF}
          onDelete={deletePDF}
          loading={pdfLoading}
        />
        <VectorDBStatus documentCount={pdfs.length} selectedPdf={selectedPdf} />
        <PDFViewer pdf={selectedPdf} />
      </div>

      <ChatContainer
        messages={messages}
        loading={chatLoading}
        onSend={sendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
}
