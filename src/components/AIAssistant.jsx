import React, { useState } from 'react';
import { useTranslation } from '../utils/useTranslation';
import './AIAssistant.css';

const AIAssistant = () => {
  const { t, currentLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: currentLanguage === 'ru' 
        ? 'Здравствуйте! Я ваш AI помощник. Чем могу помочь?' 
        : 'Hello! I am your AI assistant. How can I help you?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const websiteKnowledge = {
    ru: {
      about: "Наша компания Jetibay Group специализируется на строительстве домов, ремонте квартир и предоставлении широкого спектра строительных услуг в Кыргызстане.",
      services: "Мы предлагаем следующие услуги: строительство домов, ремонт квартир, отделочные работы, установка окон и дверей, электромонтажные работы, сантехнические работы.",
      portfolio: "В нашем портфолио представлены различные проекты, включая частные дома, квартиры, офисные помещения и коммерческие объекты.",
      store: "В нашем магазине вы можете приобрести строительные материалы и товары для ремонта.",
      contact: "Вы можете связаться с нами по телефону, электронной почте или через форму обратной связи на сайте."
    },
    en: {
      about: "Our company Jetibay Group specializes in house construction, apartment renovations, and providing a wide range of construction services in Kyrgyzstan.",
      services: "We offer the following services: house construction, apartment renovation, finishing works, window and door installation, electrical work, plumbing work.",
      portfolio: "Our portfolio includes various projects, including private houses, apartments, office spaces, and commercial facilities.",
      store: "In our store, you can purchase construction materials and repair goods.",
      contact: "You can contact us by phone, email, or through the contact form on the website."
    }
  };


  const constructionKnowledge = {
    ru: {
      houseConstruction: "Строительство домов включает в себя проектирование, закладку фундамента, возведение стен, установку кровли и внутреннюю отделку.",
      renovation: "Ремонт квартир включает демонтаж старых покрытий, подготовку поверхностей, установку новых материалов и финишную отделку.",
      materials: "Для строительства используются качественные материалы: бетон, кирпич, дерево, металл, гипсокартон, керамическая плитка и другие.",
      foundation: "Фундамент - основа любого здания. Существуют различные типы фундаментов: ленточный, свайный, монолитный.",
      insulation: "Утепление зданий помогает сохранить тепло зимой и прохладу летом. Используются минеральная вата, пенопласт, эковата."
    },
    en: {
      houseConstruction: "House construction includes design, foundation laying, wall construction, roof installation, and interior finishing.",
      renovation: "Apartment renovation includes demolition of old coverings, surface preparation, installation of new materials, and finishing work.",
      materials: "Quality materials are used for construction: concrete, brick, wood, metal, drywall, ceramic tiles, and others.",
      foundation: "Foundation is the basis of any building. There are different types of foundations: strip, pile, monolithic.",
      insulation: "Building insulation helps retain heat in winter and coolness in summer. Mineral wool, polystyrene, cellulose are used."
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

  
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = '';

      if (lowerInput.includes('о нас') || lowerInput.includes('about')) {
        response = websiteKnowledge.ru.about;
      } else if (lowerInput.includes('услуг') || lowerInput.includes('service')) {
        response = websiteKnowledge.ru.services;
      } else if (lowerInput.includes('портфолио') || lowerInput.includes('portfolio')) {
        response = websiteKnowledge.ru.portfolio;
      } else if (lowerInput.includes('магазин') || lowerInput.includes('store')) {
        response = websiteKnowledge.ru.store;
      } else if (lowerInput.includes('контакт') || lowerInput.includes('contact')) {
        response = websiteKnowledge.ru.contact;
      } 
 
      else if (lowerInput.includes('строительство') || lowerInput.includes('construction')) {
        response = constructionKnowledge.ru.houseConstruction;
      } else if (lowerInput.includes('ремонт') || lowerInput.includes('renovation')) {
        response = constructionKnowledge.ru.renovation;
      } else if (lowerInput.includes('материал') || lowerInput.includes('material')) {
        response = constructionKnowledge.ru.materials;
      } else if (lowerInput.includes('фундамент') || lowerInput.includes('foundation')) {
        response = constructionKnowledge.ru.foundation;
      } else if (lowerInput.includes('утеплен') || lowerInput.includes('insulation')) {
        response = constructionKnowledge.ru.insulation;
      }
 
      else if (lowerInput.includes('about us')) {
        response = websiteKnowledge.en.about;
      } else if (lowerInput.includes('service')) {
        response = websiteKnowledge.en.services;
      } else if (lowerInput.includes('portfolio')) {
        response = websiteKnowledge.en.portfolio;
      } else if (lowerInput.includes('store')) {
        response = websiteKnowledge.en.store;
      } else if (lowerInput.includes('contact')) {
        response = websiteKnowledge.en.contact;
      } else if (lowerInput.includes('house construction')) {
        response = constructionKnowledge.en.houseConstruction;
      } else if (lowerInput.includes('renovation')) {
        response = constructionKnowledge.en.renovation;
      } else if (lowerInput.includes('material')) {
        response = constructionKnowledge.en.materials;
      } else if (lowerInput.includes('foundation')) {
        response = constructionKnowledge.en.foundation;
      } else if (lowerInput.includes('insulation')) {
        response = constructionKnowledge.en.insulation;
      }

      else {
        const aiResponses = currentLanguage === 'ru' 
          ? [
              'Я понимаю ваш вопрос. Позвольте мне подумать...',
              'Это интересный вопрос. Я постараюсь помочь.',
              'Спасибо за ваш запрос. Я изучаю ваш вопрос.',
              'Я работаю над вашим запросом. Пожалуйста, подождите.',
              'Отличный вопрос! Дайте мне проверить информацию.'
            ]
          : [
              'I understand your question. Let me think...',
              'That\'s an interesting question. I\'ll try to help.',
              'Thank you for your request. I\'m looking into your question.',
              'I\'m working on your request. Please wait.',
              'Great question! Let me check the information.'
            ];
        
        response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      }

      const aiMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    }, 1000);
  };

  return (
    <div className="ai-assistant">
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <h3>{currentLanguage === 'ru' ? 'AI Помощник' : 'AI Assistant'}</h3>
            <button className="ai-close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>
          <div className="ai-chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`ai-message ${message.sender === 'ai' ? 'ai-message-ai' : 'ai-message-user'}`}
              >
                <div className="ai-message-text">
                  {message.text}
                </div>
                <div className="ai-message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
          <form className="ai-chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={currentLanguage === 'ru' ? 'Введите ваш вопрос...' : 'Type your question...'}
              className="ai-chat-input"
            />
            <button type="submit" className="ai-send-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
      
      <button 
        className="ai-chat-toggle"
        onClick={toggleChat}
        aria-label={currentLanguage === 'ru' ? 'Открыть AI помощник' : 'Open AI Assistant'}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          <path d="M19 7h-3V6c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
  );
};

export default AIAssistant;