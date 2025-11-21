

import axios from 'axios';

class EmailService {
  constructor() {

    this.emailServiceUrl = 'https://formspree.io/f/your-form-id';
  
    this.apiKey = null;

    this.whatsappNumber = '996706688886';
 
    this.whatsappApiToken = null; 
    this.whatsappBusinessId = null; 
  }

  async sendContactForm(formData) {
    try {

      await this.sendToWhatsApp(formData);
      

      try {
        const response = await axios.post(
          this.emailServiceUrl,
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            subject: 'New Contact Form Submission - Jetibay Group',
            timestamp: new Date().toISOString(),
            source: 'Jetibay Group Website',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
            },
          }
        );
      } catch (emailError) {
        console.log('Email service not configured, WhatsApp message sent instead');
      }

      return { success: true, data: 'Message sent successfully' };
    } catch (error) {
      console.error('Message sending error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send message',
      };
    }
  }


  async sendCalculatorResult(calculatorData, estimatedCost) {
    try {
  
      const calculatorMessage = {
        name: calculatorData.contactInfo.name,
        phone: calculatorData.contactInfo.phone,
        email: calculatorData.contactInfo.email,
        message: `Вам отправили заявку от компании Jetibay Group, надеемся понравилось!

📋 Расчет стоимости строительства:
📏 Площадь: ${calculatorData.area} м²
🏠 Тип строительства: ${calculatorData.constructionType}
🧱 Материалы: ${calculatorData.materials}
🎨 Уровень отделки: ${calculatorData.finishingLevel}
➕ Дополнительные опции: ${calculatorData.additionalOptions.join(', ')}
💰 Расчетная стоимость: ${estimatedCost.totalCost} сом
📈 Диапазон стоимости: ${estimatedCost.minCost} - ${estimatedCost.maxCost} сом`
      };
      
      await this.sendToWhatsApp(calculatorMessage);
      
      try {
        const response = await axios.post(
          this.emailServiceUrl,
          {
            name: calculatorData.contactInfo.name,
            phone: calculatorData.contactInfo.phone,
            email: calculatorData.contactInfo.email,
            subject: 'New Cost Calculator Request - Jetibay Group',
            message: `
Cost Calculator Request:
- Area: ${calculatorData.area} m²
- Construction Type: ${calculatorData.constructionType}
- Materials: ${calculatorData.materials}
- Finishing Level: ${calculatorData.finishingLevel}
- Additional Options: ${calculatorData.additionalOptions.join(', ')}
- Estimated Cost: ${estimatedCost.totalCost} som
- Cost Range: ${estimatedCost.minCost} - ${estimatedCost.maxCost} som
            `,
            timestamp: new Date().toISOString(),
            source: 'Jetibay Group Website - Cost Calculator',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
            },
          }
        );
      } catch (emailError) {
        console.log('Email service not configured, WhatsApp message sent instead');
      }

      return { success: true, data: 'Calculator result sent successfully' };
    } catch (error) {
      console.error('Calculator message sending error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to send calculator result'
      };
    }
  }

  async subscribeNewsletter(email, language) {
    try {
      const response = await axios.post(
        this.emailServiceUrl,
        {
          email: email,
          language: language,
          subject: 'New Newsletter Subscription - Jetibay Group',
          message: `New newsletter subscription request from: ${email} (Language: ${language})`,
          timestamp: new Date().toISOString(),
          source: 'Jetibay Group Website - Newsletter',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
          },
        }
      );

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Email service error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to subscribe to newsletter',
      };
    }
  }

  async sendToWhatsApp(formData) {
    const message = `Вам отправили заявку от компании Jetibay Group, надеемся понравилось!

` +
      `👤 Имя: ${formData.name}
` +
      `📞 Телефон: ${formData.phone}
` +
      `📧 Email: ${formData.email}
` +
      `💬 Сообщение: ${formData.message}

` +
      `⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek' })}

` +
      `🏗️ С уважением, команда Jetibay Group`;
    
    
    try {
      const serverResponse = await fetch('http://localhost:3001/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          formData: formData
        })
      });
      
      if (serverResponse.ok) {
        const result = await serverResponse.json();
        console.log('Server response:', result);
        if (result.success) {
          return true;
        }
      }
    } catch (serverError) {
      console.log('Server not available, using client-side fallback');
    }
    
   
    return this.sendWhatsAppMessage(this.whatsappNumber, message);
  }


  async sendWhatsAppMessage(phoneNumber, message) {
    try {

      if (this.whatsappApiToken) {
        const response = await fetch(`https://graph.facebook.com/v17.0/${this.whatsappBusinessId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.whatsappApiToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: phoneNumber,
            type: 'text',
            text: { body: message }
          })
        });
        
        if (response.ok) {
          console.log('Message sent via WhatsApp Business API');
          return true;
        }
      }
    } catch (error) {
      console.log('WhatsApp API not available, using web fallback');
    }
    
   
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
   
    this.sendTelegramNotification(message);
    
    return true;
  }


  async sendTelegramNotification(message) {
    try {
 
      
      console.log('Telegram notification prepared (not configured)');
    } catch (error) {
      console.log('Telegram notification failed:', error);
    }
  }
}

export default new EmailService();
