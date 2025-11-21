import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../utils/useTranslation'
import QRCode from 'qrcode'
import '../styles/pages.css'
import './QRCodePage.css'

const QRCodePage = () => {
  const { t, currentLanguage } = useTranslation()
  const canvasRef = useRef(null)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => { 

    document.title = `Jetibay Group - ${currentLanguage === 'ru' ? 'QR Код' : 'QR Code'}`
    
    const url = window.location.origin
    setCurrentUrl(url)
 
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, { 
        width: 400,
        margin: 2,
        color: {
          dark: '#2c3e50',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      }, (error) => {
        if (error) console.error('QR Code generation error:', error)
      })
    }
  }, [currentLanguage])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'jetibay-group-qr-code.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  return (
    <main className="page-main qr-page">
      <div className="page-content">
        <div className="page-wrapper">
          <div className="qr-content">
          <div className="qr-header">
            <div className="qr-image">
              <img src="/images/concrete.jpg" alt="QR Code" />
            </div>
            <h1 className="qr-title">
              {currentLanguage === 'ru' ? 'QR Код для доступа к сайту' : 'QR Code for Website Access'}
            </h1>
            <p className="qr-subtitle">
              {currentLanguage === 'ru' 
                ? 'Отсканируйте этот QR код с помощью камеры телефона или планшета для быстрого доступа к нашему сайту'
                : 'Scan this QR code with your phone or tablet camera for quick access to our website'}
            </p>
          </div>

          <div className="qr-container">
            <div className="qr-code-wrapper">
              <canvas ref={canvasRef} className="qr-canvas"></canvas>
            </div>
            
            <div className="qr-info">
              <div className="company-info">
                <h2>Jetibay Group</h2>
                <p>
                  {currentLanguage === 'ru' 
                    ? 'Ведущая строительная компания Кыргызстана'
                    : 'Leading Construction Company in Kyrgyzstan'}
                </p>
              </div>
              
              <div className="url-display">
                <span className="url-label">
                  {currentLanguage === 'ru' ? 'Адрес сайта:' : 'Website URL:'}
                </span>
                <span className="url-text">{currentUrl}</span>
              </div>
            </div>
          </div>

          <div className="qr-instructions">
            <h3>
              {currentLanguage === 'ru' ? 'Как сканировать QR код:' : 'How to scan QR code:'}
            </h3>
            <div className="instructions-grid">
              <div className="instruction-item">
                <div className="instruction-icon">📱</div>
                <div className="instruction-text">
                  <h4>
                    {currentLanguage === 'ru' ? 'Откройте камеру' : 'Open Camera'}
                  </h4>
                  <p>
                    {currentLanguage === 'ru' 
                      ? 'Откройте приложение камеры на вашем телефоне или планшете'
                      : 'Open the camera app on your phone or tablet'}
                  </p>
                </div>
              </div>
              
              <div className="instruction-item">
                <div className="instruction-icon">🎯</div>
                <div className="instruction-text">
                  <h4>
                    {currentLanguage === 'ru' ? 'Наведите на QR код' : 'Point at QR Code'}
                  </h4>
                  <p>
                    {currentLanguage === 'ru' 
                      ? 'Направьте камеру на QR код так, чтобы он поместился в кадр'
                      : 'Point your camera at the QR code so it fits in the frame'}
                  </p>
                </div>
              </div>
              
              <div className="instruction-item">
                <div className="instruction-icon">🌐</div>
                <div className="instruction-text">
                  <h4>
                    {currentLanguage === 'ru' ? 'Нажмите на ссылку' : 'Tap the Link'}
                  </h4>
                  <p>
                    {currentLanguage === 'ru' 
                      ? 'Нажмите на всплывающее уведомление, чтобы открыть сайт'
                      : 'Tap the notification that appears to open the website'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="qr-actions">
            <button onClick={handlePrint} className="btn btn-primary">
              {currentLanguage === 'ru' ? '🖨️ Распечатать' : '🖨️ Print'}
            </button>
            <button onClick={handleDownload} className="btn btn-secondary">
              {currentLanguage === 'ru' ? '💾 Скачать' : '💾 Download'}
            </button>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default QRCodePage