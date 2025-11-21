import React, { useState, useEffect } from 'react';
import { useTranslation } from '../utils/useTranslation';
import './CostCalculator.css';

const CostCalculator = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [calculatorData, setCalculatorData] = useState({
    area: '',
    constructionType: '',
    materials: '',
    finishingLevel: '',
    additionalOptions: [],
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    }
  });
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const steps = [
    { id: 1, title: { ru: 'Площадь', ky: 'Аянты' } },
    { id: 2, title: { ru: 'Тип строительства', ky: 'Курулуш түрү' } },
    { id: 3, title: { ru: 'Материалы', ky: 'Материалдар' } },
    { id: 4, title: { ru: 'Отделка', ky: 'Бүтүрүү' } },
    { id: 5, title: { ru: 'Контакты', ky: 'Байланыштар' } }
  ];

  const constructionTypes = [
    {
      id: 'residential',
      name: { ru: 'Жилое строительство', ky: 'Турак курулушу' },
      description: { ru: 'Частные дома, коттеджи', ky: 'Жеке үйлөр, коттеждер' },
      basePrice: 15000,
      icon: '🏠'
    },
    {
      id: 'commercial',
      name: { ru: 'Коммерческое строительство', ky: 'Коммерциялык курулуш' },
      description: { ru: 'Офисы, магазины, рестораны', ky: 'Кеңселер, дүкөндөр, ресторандар' },
      basePrice: 18000,
      icon: '🏢'
    },
    {
      id: 'renovation',
      name: { ru: 'Реконструкция', ky: 'Реконструкция' },
      description: { ru: 'Ремонт и модернизация', ky: 'Оңдоо жана заманчалаштыруу' },
      basePrice: 12000,
      icon: '🔨'
    }
  ];

  const materials = [
    {
      id: 'economy',
      name: { ru: 'Эконом', ky: 'Экономдуу' },
      description: { ru: 'Базовые материалы', ky: 'Негизги материалдар' },
      multiplier: 1.0,
      icon: '💰'
    },
    {
      id: 'standard',
      name: { ru: 'Стандарт', ky: 'Стандарт' },
      description: { ru: 'Качественные материалы', ky: 'Сапаттуу материалдар' },
      multiplier: 1.3,
      icon: '⭐'
    },
    {
      id: 'premium',
      name: { ru: 'Премиум', ky: 'Премиум' },
      description: { ru: 'Высококачественные материалы', ky: 'Жогорку сапаттагы материалдар' },
      multiplier: 1.8,
      icon: '💎'
    }
  ];

  const finishingLevels = [
    {
      id: 'basic',
      name: { ru: 'Базовая отделка', ky: 'Негизги бүтүрүү' },
      description: { ru: 'Простая отделка', ky: 'Жөнөкөй бүтүрүү' },
      multiplier: 1.0,
      icon: '🎨'
    },
    {
      id: 'comfort',
      name: { ru: 'Комфорт', ky: 'Комфорт' },
      description: { ru: 'Улучшенная отделка', ky: 'Жакшыртылган бүтүрүү' },
      multiplier: 1.4,
      icon: '✨'
    },
    {
      id: 'luxury',
      name: { ru: 'Люкс', ky: 'Люкс' },
      description: { ru: 'Дизайнерская отделка', ky: 'Дизайнердик бүтүрүү' },
      multiplier: 2.0,
      icon: '👑'
    }
  ];

  const additionalOptions = [
    {
      id: 'heating',
      name: { ru: 'Система отопления', ky: 'Жылытуу системасы' },
      price: 150000,
      icon: '🔥'
    },
    {
      id: 'plumbing',
      name: { ru: 'Водоснабжение', ky: 'Суу менен камсыздоо' },
      price: 100000,
      icon: '🚿'
    },
    {
      id: 'electrical',
      name: { ru: 'Электричество', ky: 'Электр камсыздоо' },
      price: 80000,
      icon: '⚡'
    },
    {
      id: 'security',
      name: { ru: 'Система безопасности', ky: 'Коопсуздук системасы' },
      price: 120000,
      icon: '🔒'
    },
    {
      id: 'landscape',
      name: { ru: 'Ландшафтный дизайн', ky: 'Ландшафттык дизайн' },
      price: 90000,
      icon: '🌳'
    }
  ];

  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const toggleAdditionalOption = (optionId) => {
    setCalculatorData(prev => ({
      ...prev,
      additionalOptions: prev.additionalOptions.includes(optionId)
        ? prev.additionalOptions.filter(id => id !== optionId)
        : [...prev.additionalOptions, optionId]
    }));
  };

  const calculateCost = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const selectedType = constructionTypes.find(type => type.id === calculatorData.constructionType);
      const selectedMaterial = materials.find(material => material.id === calculatorData.materials);
      const selectedFinishing = finishingLevels.find(level => level.id === calculatorData.finishingLevel);
      
      if (!selectedType || !selectedMaterial || !selectedFinishing || !calculatorData.area) {
        setIsCalculating(false);
        return;
      }

      let baseCost = selectedType.basePrice * parseFloat(calculatorData.area);
      baseCost *= selectedMaterial.multiplier;
      baseCost *= selectedFinishing.multiplier;

      const additionalCost = calculatorData.additionalOptions.reduce((total, optionId) => {
        const option = additionalOptions.find(opt => opt.id === optionId);
        return total + (option ? option.price : 0);
      }, 0);

      const totalCost = baseCost + additionalCost;
      
      setEstimatedCost({
        baseCost,
        additionalCost,
        totalCost,
        minCost: totalCost * 0.9,
        maxCost: totalCost * 1.15
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateCost();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return calculatorData.area && parseFloat(calculatorData.area) > 0;
      case 2:
        return calculatorData.constructionType;
      case 3:
        return calculatorData.materials;
      case 4:
        return calculatorData.finishingLevel;
      case 5:
        return calculatorData.contactInfo.name && calculatorData.contactInfo.phone;
      default:
        return false;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + ' сом';
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setCalculatorData({
      area: '',
      constructionType: '',
      materials: '',
      finishingLevel: '',
      additionalOptions: [],
      contactInfo: {
        name: '',
        phone: '',
        email: ''
      }
    });
    setEstimatedCost(null);
  };

  return (
    <section className="cost-calculator" id="calculator">
      <div className="container">
        <div className="section-header">
          <h2>{t('calculator.title', 'Калькулятор стоимости строительства', 'Курулуш наркынын калькулятору')}</h2>
          <p>{t('calculator.subtitle', 'Получите предварительную оценку стоимости вашего проекта за 5 минут', '5 мүнөттө долбооруңуздун алдын ала наркын алыңыз')}</p>
        </div>

        <div className="calculator-container">
          {!estimatedCost ? (
            <>
            
              <div className="progress-steps">
                {steps.map((step, index) => (
                  <div key={step.id} className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                    <div className="step-number">{step.id}</div>
                    <div className="step-title">{t('', step.title.ru, step.title.ky)}</div>
                    {index < steps.length - 1 && <div className="step-line"></div>}
                  </div>
                ))}
              </div>

          
              <div className="step-content">
                {currentStep === 1 && (
                  <div className="step-form">
                    <h3>{t('calculator.step1.title', 'Укажите площадь строительства', 'Курулуш аянтын көрсөтүңүз')}</h3>
                    <p>{t('calculator.step1.description', 'Введите общую площадь в квадратных метрах', 'Жалпы аянты чарчы метр менен киргизиңиз')}</p>
                    <div className="area-input">
                      <input
                        type="number"
                        placeholder="0"
                        value={calculatorData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        className="area-field"
                      />
                      <span className="area-unit">м²</span>
                    </div>
                    <div className="area-examples">
                      <button onClick={() => handleInputChange('area', '100')} className="example-btn">100 м²</button>
                      <button onClick={() => handleInputChange('area', '150')} className="example-btn">150 м²</button>
                      <button onClick={() => handleInputChange('area', '200')} className="example-btn">200 м²</button>
                      <button onClick={() => handleInputChange('area', '300')} className="example-btn">300 м²</button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="step-form">
                    <h3>{t('calculator.step2.title', 'Выберите тип строительства', 'Курулуш түрүн тандаңыз')}</h3>
                    <div className="options-grid">
                      {constructionTypes.map(type => (
                        <div
                          key={type.id}
                          className={`option-card ${calculatorData.constructionType === type.id ? 'selected' : ''}`}
                          onClick={() => handleInputChange('constructionType', type.id)}
                        >
                          <div className="option-icon">{type.icon}</div>
                          <h4>{t('', type.name.ru, type.name.ky)}</h4>
                          <p>{t('', type.description.ru, type.description.ky)}</p>
                          <div className="option-price">от {formatCurrency(type.basePrice)}/м²</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="step-form">
                    <h3>{t('calculator.step3.title', 'Выберите класс материалов', 'Материалдардын классын тандаңыз')}</h3>
                    <div className="options-grid">
                      {materials.map(material => (
                        <div
                          key={material.id}
                          className={`option-card ${calculatorData.materials === material.id ? 'selected' : ''}`}
                          onClick={() => handleInputChange('materials', material.id)}
                        >
                          <div className="option-icon">{material.icon}</div>
                          <h4>{t('', material.name.ru, material.name.ky)}</h4>
                          <p>{t('', material.description.ru, material.description.ky)}</p>
                          <div className="option-multiplier">×{material.multiplier}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="step-form">
                    <h3>{t('calculator.step4.title', 'Уровень отделки', 'Бүтүрүү деңгээли')}</h3>
                    <div className="options-grid">
                      {finishingLevels.map(level => (
                        <div
                          key={level.id}
                          className={`option-card ${calculatorData.finishingLevel === level.id ? 'selected' : ''}`}
                          onClick={() => handleInputChange('finishingLevel', level.id)}
                        >
                          <div className="option-icon">{level.icon}</div>
                          <h4>{t('', level.name.ru, level.name.ky)}</h4>
                          <p>{t('', level.description.ru, level.description.ky)}</p>
                          <div className="option-multiplier">×{level.multiplier}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="additional-options">
                      <h4>{t('calculator.additional.title', 'Дополнительные опции', 'Кошумча опциялар')}</h4>
                      <div className="additional-grid">
                        {additionalOptions.map(option => (
                          <div
                            key={option.id}
                            className={`additional-card ${calculatorData.additionalOptions.includes(option.id) ? 'selected' : ''}`}
                            onClick={() => toggleAdditionalOption(option.id)}
                          >
                            <div className="additional-icon">{option.icon}</div>
                            <div className="additional-info">
                              <h5>{t('', option.name.ru, option.name.ky)}</h5>
                              <div className="additional-price">+{formatCurrency(option.price)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="step-form">
                    <h3>{t('calculator.step5.title', 'Контактная информация', 'Байланыш маалыматтары')}</h3>
                    <p>{t('calculator.step5.description', 'Оставьте контакты для получения детального расчета', 'Деталдуу эсеп алуу үчүн байланыш маалыматтарын калтырыңыз')}</p>
                    <div className="contact-form">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder={t('calculator.name', 'Ваше имя', 'Сиздин атыңыз')}
                          value={calculatorData.contactInfo.name}
                          onChange={(e) => handleContactChange('name', e.target.value)}
                          className="contact-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="tel"
                          placeholder={t('calculator.phone', 'Телефон', 'Телефон')}
                          value={calculatorData.contactInfo.phone}
                          onChange={(e) => handleContactChange('phone', e.target.value)}
                          className="contact-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          placeholder={t('calculator.email', 'Email (необязательно)', 'Email (милдеттүү эмес)')}
                          value={calculatorData.contactInfo.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          className="contact-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="step-navigation">
                {currentStep > 1 && (
                  <button onClick={prevStep} className="nav-btn prev-btn">
                    ← {t('calculator.back', 'Назад', 'Артка')}
                  </button>
                )}
                <button
                  onClick={nextStep}
                  disabled={!canProceed() || isCalculating}
                  className="nav-btn next-btn"
                >
                  {isCalculating ? (
                    <span className="calculating">
                      <span className="spinner"></span>
                      {t('calculator.calculating', 'Рассчитываем...', 'Эсептеп жатабыз...')}
                    </span>
                  ) : currentStep === steps.length ? (
                    t('calculator.calculate', 'Рассчитать стоимость', 'Наркты эсептеө')
                  ) : (
                    t('calculator.next', 'Далее', 'Дагы') + ' →'
                  )}
                </button>
              </div>
            </>
          ) : (
         
            <div className="calculator-results">
              <div className="results-header">
                <h3>{t('calculator.results.title', 'Предварительная стоимость', 'Алдын ала наркы')}</h3>
                <p>{t('calculator.results.subtitle', 'Расчет основан на ваших параметрах', 'Эсеп сиздин параметрлериңизге негизделген')}</p>
              </div>

              <div className="cost-breakdown">
                <div className="cost-item">
                  <span>{t('calculator.results.baseCost', 'Базовая стоимость:', 'Негизги наркы:')}</span>
                  <span className="cost-value">{formatCurrency(estimatedCost.baseCost)}</span>
                </div>
                {estimatedCost.additionalCost > 0 && (
                  <div className="cost-item">
                    <span>{t('calculator.results.additional', 'Дополнительные опции:', 'Кошумча опциялар:')}</span>
                    <span className="cost-value">+{formatCurrency(estimatedCost.additionalCost)}</span>
                  </div>
                )}
                <div className="cost-total">
                  <span>{t('calculator.results.total', 'Итого:', 'Жыйынтыгы:')}</span>
                  <span className="total-value">{formatCurrency(estimatedCost.totalCost)}</span>
                </div>
                <div className="cost-range">
                  {t('calculator.results.range', 'Диапазон цен:', 'Баа диапазону:')} {formatCurrency(estimatedCost.minCost)} - {formatCurrency(estimatedCost.maxCost)}
                </div>
              </div>

              <div className="results-actions">
                <button onClick={resetCalculator} className="action-btn secondary">
                  {t('calculator.results.recalculate', 'Пересчитать', 'Кайра эсептеө')}
                </button>
                <button className="action-btn primary">
                  {t('calculator.results.getDetailed', 'Получить детальный расчет', 'Деталдуу эсеп алуу')}
                </button>
              </div>

              <div className="results-note">
                <p>{t('calculator.results.note', 'Это предварительная оценка. Для точного расчета стоимости свяжитесь с нашими специалистами.', 'Бул алдын ала баа. Так наркты эсептеө үчүн биздин адистер менен байланышыңыз.')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;