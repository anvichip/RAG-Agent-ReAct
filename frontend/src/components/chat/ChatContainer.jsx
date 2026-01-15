import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { LoadingIndicator } from './LoadingIndicator';
import { ChatInput } from './ChatInput';

export const ChatContainer = ({ messages, loading, onSend, messagesEndRef }) => {
  return (
    <div className="col-span-9 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Start a conversation</p>
              <p className="text-sm mt-2">Ask questions about your uploaded PDFs</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)
        )}
        {loading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={onSend} loading={loading} />
    </div>
  );
};