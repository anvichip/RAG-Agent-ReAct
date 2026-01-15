// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Layout
// import Layout from "./components/layout/Layout";

// // Pages
// import ChatPage from "./pages/ChatPage";
// // import AnalyticsPage from "./pages/AnalyticsPage";
// // import KnowledgePage from "./pages/KnowledgePage";
// // import SettingsPage from "./pages/SettingsPage";

// export default function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/chat" replace />} />
//           <Route path="/chat" element={<ChatPage />} />
//           {/* <Route path="/analytics" element={<AnalyticsPage />} />
//           <Route path="/knowledge" element={<KnowledgePage />} />
//           <Route path="/settings" element={<SettingsPage />} /> */}

//           {/* fallback */}
//           <Route path="*" element={<Navigate to="/chat" replace />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

import React from "react";
import ChatPage from "./pages/ChatPage";
import { Navbar } from "./components/layout/Navbar";

export default function App() {
  return (
    <div className="min-h-screen p-4">
      <Navbar />
      <ChatPage />
    </div>
  );
}
