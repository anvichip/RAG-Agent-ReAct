import React from 'react';
import { MessageCircle } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'chat', label: 'Chat' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'knowledge', label: 'Knowledge Base' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI Chatbot</span>
          </div>
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};