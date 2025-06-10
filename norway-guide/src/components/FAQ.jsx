import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css'; // Import custom styles

const FAQ_ITEMS = [
  {
    id: 1,
    question: "How do I access the Guide and Map?",
    answer: "Our platform connects travelers with local experts. Sign up as a guide to share your knowledge of your destination."
  },
  {
    id: 2,
    question: "Do I need internet connection?",
    answer: "While our guide works offline, internet access is needed for initial download, maps, and real-time updates."
  },
  {
    id: 3,
    question: "How long will I have access?",
    answer: "Purchased guides provide lifetime access with regular updates and new content additions."
  },
  {
    id: 4,
    question: "Can I share it with my travel buddy?",
    answer: "Yes, you can share access with your travel companions through our family sharing feature."
  }
];

export default function FAQ({ className = '' }) {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={`container-fluid ${className}`} style={{ maxWidth: '896px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="mb-4">
        <h2 className="faq-title mb-2">
          Your questions,
        </h2>
        <h2 className="faq-title">
          answered
        </h2>
      </div>
     
      <div className="faq-container">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.id}
            className="faq-item mb-3"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="faq-button w-100 d-flex justify-content-between align-items-center"
            >
              <span className="faq-question pe-3">
                {item.question}
              </span>
              <ChevronDown
                className={`faq-chevron ${openItems[item.id] ? 'rotated' : ''}`}
                size={20}
              />
            </button>
           
            {openItems[item.id] && (
              <div className="faq-answer">
                <p className="faq-answer-text mb-0">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}