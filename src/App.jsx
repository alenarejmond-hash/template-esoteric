import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Moon, TrendingUp, UserCircle2, Globe,
  Phone, MessageCircle, Diamond, Star, QrCode,
  X, Share2, Copy, Check, UserPlus
} from 'lucide-react';

// Кастомная иконка Instagram (из lucide-react бренды удалили)
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// ==========================================
// ⚙️ НАСТРОЙКИ ССЫЛОК И МЕДИА
// ==========================================
const CONTENT = {
  esoteric: {
    bgImage: '/bg-esoteric.webp', // ФОН: файл bg-esoteric.jpg в папке public
    avatar: '/avatar-esoteric.webp', // АВАТАР: файл avatar-esoteric.jpg в папке public
    tgLink: 'https://t.me/твой_юзернейм',
    instLink: 'https://instagram.com/твой_юзернейм',
    tgChannelLink: 'https://t.me/твой_канал', // ССЫЛКА НА TG КАНАЛ
    waLink: 'https://wa.me/79990000000',      // ССЫЛКА НА WHATSAPP
    actionLink: 'https://t.me/твой_юзернейм?text=Привет!%20Хочу%20расклад'
  }
};

// ==========================================
// 🌍 ПЕРЕВОДЫ (НАСТРОЙКИ ТЕКСТА)
// ==========================================
const TRANSLATIONS = {
  RU: {
    badge: 'Таро & Астрология',
    name1: 'Алена',
    name2: 'Светлая',
    role: 'Элитный Астролог',
    status: 'Запись открыта',
    tarotTitle: 'Карты Таро',
    tarotText: 'Глубокие расклады на любовь, карьеру и судьбу. Карты подсвечивают скрытые мотивы, показывают последствия выбора и помогают найти самый верный путь к цели.',
    astroTitle: 'Астрология',
    astroText: 'Детальный разбор натальной карты. Узнай свои сильные стороны, скрытые таланты, кармические задачи и самые удачные периоды для важных жизненных шагов.',
    numeroTitle: 'Нумерология',
    numeroText: 'Анализ Матрицы Судьбы. Расшифровка твоего уникального финансового кода и выявление энергетических блоков, которые мешают росту и изобилию.',
    personalTitle: 'Личный Прием',
    personalText: 'Индивидуальная сессия тет-а-тет. Полное погружение в твой запрос, бережная энергетическая чистка и постановка мощной защиты от негатива.',
    groupTitle: 'Женские Круги',
    groupText: 'Групповые энергопрактики и медитации в поле единомышленников. Мощная синергия, взаимная поддержка и глубокое раскрытие внутренней женской силы.',
    reviewsTitle: 'Отзывы',
    reviewQuote: 'Алена — настоящий проводник! После сессии жизнь изменилась на 180 градусов, ушли страхи и тревога. Благодарю за свет!',
    reviewAuthor: '— Марина, Москва',
    contactsTitle: 'Быстрые контакты',
    tgChannel: 'Telegram',
    shareModalTitle: 'Поделиться визиткой',
    shareModalDesc: 'Дайте отсканировать QR-код или отправьте ссылку напрямую.',
    copied: 'Скопировано!',
    copy: 'Копировать',
    shareBtn: 'Отправить',
    shareMsgTitle: 'Моя цифровая визитка',
    shareMsgText: 'Привет! Вот моя визитка с контактами:',
  },
  EN: {
    badge: 'Tarot & Astrology',
    name1: 'Alena',
    name2: 'Svetlaya',
    role: 'Elite Astrologer',
    status: 'Available Now',
    tarotTitle: 'Tarot Cards',
    tarotText: 'Deep readings on love, career, and destiny. The cards illuminate hidden motives, reveal the consequences of choices, and help you find the truest path to your goals.',
    astroTitle: 'Astrology',
    astroText: 'Detailed birth chart analysis. Discover your strengths, hidden talents, karmic tasks, and the most favorable periods for important life steps.',
    numeroTitle: 'Numerology',
    numeroText: 'Destiny Matrix analysis. Decoding your unique financial code and identifying energetic blocks that hinder your growth and abundance.',
    personalTitle: 'Private Session',
    personalText: 'One-on-one session. Complete immersion in your request, gentle energetic cleansing, and establishing powerful protection against negativity.',
    groupTitle: 'Women\'s Circles',
    groupText: 'Group energy practices and meditations with like-minded women. Powerful synergy, mutual support, and profound awakening of inner feminine power.',
    reviewsTitle: 'Reviews',
    reviewQuote: 'Alena is a true guide! After our session, my life changed 180 degrees, my fears and anxiety vanished. Thank you for the light!',
    reviewAuthor: '— Marina, Moscow',
    contactsTitle: 'Quick Contacts',
    tgChannel: 'TG Channel',
    shareModalTitle: 'Share Card',
    shareModalDesc: 'Let them scan the QR code or send the link directly.',
    copied: 'Copied!',
    copy: 'Copy',
    shareBtn: 'Share',
    shareMsgTitle: 'My digital business card',
    shareMsgText: 'Hi! Here is my card with contacts:',
  },
  AM: {
    badge: 'Տարո և Աստղագիտություն',
    name1: 'Ալյոնա',
    name2: 'Սվետլայա',
    role: 'Էլիտար Աստղաբան',
    status: 'Գրանցումը բաց է',
    tarotTitle: 'Տարո Քարտեր',
    tarotText: 'Խորը վերլուծություններ սիրո, կարիերայի և ճակատագրի վերաբերյալ: Քարտերը բացահայտում են թաքնված շարժառիթները, ցույց են տալիս ընտրության հետևանքները և օգնում գտնել նպատակին հասնելու ամենաճիշտ ուղին:',
    astroTitle: 'Աստղագիտություն',
    astroText: 'Ծննդյան քարտեզի մանրամասն վերլուծություն: Բացահայտեք ձեր ուժեղ կողմերը, թաքնված տաղանդները, կարմայական խնդիրները և կարևոր քայլերի համար ամենաբարենպաստ ժամանակահատվածները:',
    numeroTitle: 'Նումերոլոգիա',
    numeroText: 'Ճակատագրի Մատրիցայի վերլուծություն: Ձեր եզակի ֆինանսական կոդի վերծանում և էներգետիկ բլոկների բացահայտում, որոնք խանգարում են աճին և առատությանը:',
    personalTitle: 'Անհատական Հանդիպում',
    personalText: 'Անհատական սեսիա դեմ առ դեմ: Լիարժեք խորասուզում ձեր հարցման մեջ, նուրբ էներգետիկ մաքրում և հզոր պաշտպանության տեղադրում նեգատիվից:',
    groupTitle: 'Կանանց Շրջանակներ',
    groupText: 'Խմբակային էներգետիկ պրակտիկաներ և մեդիտացիաներ համախոհների շրջապատում: Հզոր սիներգիա, փոխադարձ աջակցություն և կանացի ներքին ուժի խորը բացահայտում:',
    reviewsTitle: 'Կարծիքներ',
    reviewQuote: 'Ալյոնան իսկական ուղեկցորդ է: Սեսիայից հետո կյանքս փոխվեց 180 աստիճանով, վախերն ու անհանգստությունն անհետացան: Շնորհակալ եմ լույսի համար:',
    reviewAuthor: '— Մարինա, Մոսկվա',
    contactsTitle: 'Արագ Կապ',
    tgChannel: 'TG Ալիք',
    shareModalTitle: 'Կիսվել այցեքարտով',
    shareModalDesc: 'Թույլ տվեք սկանավորել QR կոդը կամ ուղարկեք հղումը անմիջապես:',
    copied: 'Պատճենված է!',
    copy: 'Պատճենել',
    shareBtn: 'Ուղարկել',
    shareMsgTitle: 'Իմ թվային այցեքարտը',
    shareMsgText: 'Ողջույն։ Ահա իմ այցեքարտը կոնտակտներով՝',
  }
};

// --- Глобальные стили для сложных анимаций (вставляем прямо в компонент) ---
const globalStyles = `
  :root {
    --card-h: calc(min(22rem, 50vh) * 1.6);
  }
  @media (min-width: 640px) {
    :root {
      --card-h: calc(min(22rem, 50vh) * 1.5);
    }
  }
  body {
    background-color: #0a0a0a;
    overscroll-behavior: none;
    overflow-x: hidden;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  }
  .card-preserve-3d {
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }
  .card-backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
  @keyframes spark-explode {
    0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
  }
  @keyframes spark-wander {
    0% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
    33% { transform: translate(calc(var(--tx) * 1.5 + var(--wx1)), calc(var(--ty) * 1.5 + var(--wy1))) scale(1.5); opacity: 0.8; }
    66% { transform: translate(calc(var(--tx) * 2.5 + var(--wx2)), calc(var(--ty) * 2.5 + var(--wy2))) scale(1.2); opacity: 0.5; }
    100% { transform: translate(calc(var(--tx) * 4 + var(--wx3)), calc(var(--ty) * 4 + var(--wy3))) scale(0.8); opacity: 0; }
  }
  .spark-particle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
    pointer-events: none;
    animation: 
      spark-explode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards,
      spark-wander var(--wt) linear 0.8s forwards;
  }
  
  /* === АНИМАЦИИ ДЛЯ ЭФФЕКТА СГОРАЮЩЕЙ БУМАГИ (Только для десктопа) === */
  @media (min-width: 640px) {
    @keyframes burn-mask-reveal {
      0% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
      100% { -webkit-mask-position: 0% 100%; mask-position: 0% 100%; }
    }
    
    @keyframes burn-fire-scan {
      0% { background-position: 100% 0%; opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { background-position: 0% 100%; opacity: 0; }
    }
    
    .smooth-mask-wipe {
      -webkit-mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      -webkit-mask-size: 300% 300%;
      mask-size: 300% 300%;
      -webkit-mask-position: 100% 0%;
      mask-position: 100% 0%;
      animation: burn-mask-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: mask-position, -webkit-mask-position;
    }
    
    .burn-fire-edge {
      background: 
        linear-gradient(224deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1, rgba(220, 38, 38, 0.9)) 49.5%, 
          var(--burn-c2, rgba(250, 150, 0, 1)) 50%, 
          var(--burn-c3, rgba(255, 220, 50, 0.8)) 50.2%,
          transparent 51%
        ),
        linear-gradient(226deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1, rgba(220, 38, 38, 0.9)) 49.5%, 
          var(--burn-c2, rgba(250, 150, 0, 1)) 50%, 
          var(--burn-c3, rgba(255, 220, 50, 0.8)) 50.2%,
          transparent 51%
        );
      background-size: 300% 300%;
      background-position: 100% 0%;
      mix-blend-mode: normal;
      filter: drop-shadow(0 0 8px var(--burn-c2, rgba(250, 100, 0, 0.8))) blur(0.5px);
      animation: burn-fire-scan 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: background-position, opacity;
    }
  }

  /* Простая анимация проявления для мобильных устройств (экономит ресурсы) */
  @media (max-width: 639px) {
    @keyframes simple-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .smooth-mask-wipe {
      opacity: 0;
      animation: simple-fade-in 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .burn-fire-edge {
      display: none;
    }
  }
  
  /* === АНИМАЦИИ ЭЗОТЕРИКА === */
  @keyframes esoteric-slow-drift-1 {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes esoteric-slow-drift-2 {
    0%   { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes esoteric-slow-expand {
    0%   { transform: scale(1); opacity: 0.8; }
    50%  { transform: scale(2.2); opacity: 0; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  /* === АНИМАЦИИ ДЛЯ СВЕТОВОГО ШАРА (DOCK ПАНЕЛИ) === */
  @keyframes scan-vertical {
    0%, 10% { top: 5%; opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    90%, 100% { top: 95%; opacity: 0; }
  }
`;

// ==========================================
// 🪄 КОМПОНЕНТ ЭФФЕКТА СГОРАНИЯ
// ==========================================
const BurnRevealImage = ({ src, className, style, imgClassName = "", burnColor = "default" }) => {
  // Оставляем только нужные для эзотерика цвета пламени
  const themes = {
    default: { c1: 'rgba(220, 38, 38, 0.9)', c2: 'rgba(250, 150, 0, 1)', c3: 'rgba(255, 220, 50, 0.8)' },
    purple: { c1: 'rgba(88, 28, 135, 0.9)', c2: 'rgba(168, 85, 247, 1)', c3: 'rgba(216, 180, 254, 0.8)' },
  };
  
  const t = themes[burnColor] || themes.default;

  return (
    <div className={`absolute inset-0 pointer-events-none rounded-[2.5rem] ${className}`} style={{ ...style, clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}>
      {/* 1. Слой самого фото (плавное проявление) */}
      <div 
        className={`absolute inset-0 bg-cover bg-center smooth-mask-wipe rounded-[2.5rem] ${imgClassName}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* 2. Эффект линии огня и тлеющего края */}
      <div 
        className="absolute inset-0 burn-fire-edge rounded-[2.5rem]" 
        style={{
          '--burn-c1': t.c1,
          '--burn-c2': t.c2,
          '--burn-c3': t.c3,
        }}
      />
    </div>
  );
};

// ==========================================
// ШАБЛОН ВИЗИТКИ: ЭЗОТЕРИК
// ==========================================
const EsotericCard = ({ lang }) => {
  const [view, setView] = useState('tarot');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.RU;

  return (
    <>
      {/* ЛИЦЕВАЯ СТОРОНА */}
      {/* 
        Фикс для свечения и уголков: 
        1. Внешний div (без clip-path) создает тень и фон.
        2. Внутренний div (с clip-path и overflow-hidden) аккуратно обрезает содержимое 
           не повреждая внешнее свечение.
      */}
      <div 
        className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.4)] bg-[#0a0a0a] group-hover:shadow-[0_20px_80px_rgba(168,85,247,0.6)] transition-shadow duration-700"
      >
        <div 
          className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col p-[clamp(1.25rem,6cqw,1.5rem)] text-white"
          style={{ clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 via-purple-900/80 to-amber-900/80 sm:from-indigo-600 sm:via-purple-600 sm:to-amber-500 opacity-80 sm:opacity-70 mix-blend-normal sm:mix-blend-screen"></div>
          
          {/* ФОН СГОРАЮЩИЙ (Фиолетовый огонь) */}
          <BurnRevealImage src={CONTENT.esoteric.bgImage} className="opacity-40 sm:opacity-60 mix-blend-normal sm:mix-blend-luminosity" burnColor="purple" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-[#111]/90 sm:bg-black/40 sm:backdrop-blur-md px-[clamp(0.5rem,3cqw,0.75rem)] py-[clamp(0.25rem,1.5cqw,0.375rem)] rounded-full border border-purple-500/30 flex items-center gap-[clamp(0.25rem,1.5cqw,0.375rem)]">
                <Sparkles className="w-[clamp(0.75rem,3cqw,0.875rem)] h-[clamp(0.75rem,3cqw,0.875rem)] text-amber-300" />
                <span className="text-[clamp(0.5rem,2.5cqw,0.625rem)] font-bold tracking-wider uppercase text-purple-100">{t.badge}</span>
              </div>
              <Moon className="w-[clamp(1.5rem,7cqw,2rem)] h-[clamp(1.5rem,7cqw,2rem)] text-amber-200/80 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            </div>

            <div>
              <h2 className="text-[clamp(1.75rem,9cqw,2.5rem)] leading-tight font-serif font-black mb-[clamp(0.125rem,1cqw,0.25rem)] uppercase tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                {t.name1}
                <br />
                {t.name2}
              </h2>
              <div className="flex flex-wrap items-center gap-[clamp(0.5rem,3cqw,0.75rem)] mt-[clamp(0.25rem,2cqw,0.5rem)]">
                <p className="text-amber-300 font-bold text-[clamp(0.6rem,3cqw,0.75rem)] uppercase tracking-[0.2em] border-l-2 border-purple-500 pl-[clamp(0.5rem,3cqw,0.75rem)]">
                  {t.role}
                </p>
                <div className="flex items-center gap-[clamp(0.25rem,1.5cqw,0.375rem)] bg-[#111]/90 sm:bg-black/40 sm:backdrop-blur-md px-[clamp(0.375rem,2cqw,0.5rem)] py-[clamp(0.125rem,1cqw,0.25rem)] rounded-full border border-purple-500/30">
                  <span className="w-[clamp(0.25rem,1cqw,0.375rem)] h-[clamp(0.25rem,1cqw,0.375rem)] rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                  <span className="text-[clamp(0.4rem,2cqw,0.5rem)] font-bold uppercase tracking-wider text-amber-100">{t.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ОБРАТНАЯ СТОРОНА (GlassOS / Vertical Left Dock) */}
      <div 
        className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.4)] bg-[#0a0a0a] border border-purple-900/30" 
        style={{ transform: 'rotateY(180deg)' }}
      >
        <div 
          className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden flex flex-row p-[clamp(0.75rem,4cqw,1rem)] gap-[clamp(0.75rem,4cqw,1rem)] text-white"
          style={{ clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}
        >
          {/* Обертка для фона, чтобы не торчали полупрозрачные углы */}
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }}>
            {/* ФОН МАНДАЛЫ (Медленные орбиты и Аура) */}
            <div className="absolute -top-[20%] -left-[20%] w-[160%] aspect-square rounded-full border border-purple-500/30 border-dashed pointer-events-none" style={{ animation: 'esoteric-slow-drift-1 90s linear infinite', transformOrigin: '45% 55%' }}></div>
            <div className="absolute -bottom-[30%] -right-[30%] w-[140%] aspect-square rounded-full border-[1.5px] border-amber-500/30 pointer-events-none" style={{ animation: 'esoteric-slow-drift-2 100s linear infinite', transformOrigin: '55% 45%' }}></div>
            <div className="absolute top-[20%] left-[10%] w-[80%] aspect-square rounded-full border-2 border-purple-500/40 pointer-events-none" style={{ animation: 'esoteric-slow-expand 30s ease-in-out infinite' }}></div>
            
            <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-purple-900/40 blur-[50px] pointer-events-none"></div>
            <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full bg-amber-600/20 blur-[40px] animate-pulse pointer-events-none"></div>
          </div>

          {/* === ЛЕВАЯ ПАНЕЛЬ (DOCK) === */}
          <div 
            className="relative z-50 flex flex-col items-center justify-between bg-[#151515]/95 sm:bg-[#050505]/60 sm:backdrop-blur-xl py-[clamp(0.75rem,4cqw,1rem)] px-[clamp(0.25rem,1.5cqw,0.375rem)] rounded-[2rem] border border-purple-500/30 shadow-[0_10px_40px_rgba(147,51,234,0.4)] w-[clamp(2.5rem,12cqw,3.15rem)] shrink-0 no-tilt cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Световой шар (Мягкий светящийся блик, бегающий сверху вниз) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[clamp(1rem,5cqw,1.5rem)] h-[clamp(1rem,5cqw,1.5rem)] bg-amber-400/40 rounded-full blur-[6px] shadow-[0_0_15px_rgba(251,191,36,0.6)] pointer-events-none z-0" style={{ animation: 'scan-vertical 3s ease-in-out infinite' }}></div>

            <div className="flex flex-col gap-[clamp(0.375rem,2cqw,0.625rem)] w-full items-center relative z-10">
              {[
                { id: 'tarot', icon: Diamond },
                { id: 'astro', icon: Moon },
                { id: 'numero', icon: TrendingUp },
                { id: 'personal', icon: UserCircle2 },
                { id: 'group', icon: Globe },
                { id: 'contacts', icon: Phone },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`relative p-[clamp(0.375rem,2cqw,0.5rem)] rounded-full transition-all duration-300 flex items-center justify-center w-full ${view === item.id ? 'bg-gradient-to-br from-purple-500 to-amber-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110' : 'text-purple-400/70 hover:text-amber-300 hover:bg-purple-900/40'}`}
                >
                  <item.icon className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)]" />
                </button>
              ))}
            </div>
            
            <div className="w-full flex flex-col items-center gap-[clamp(0.25rem,1.5cqw,0.5rem)] relative z-10 mt-[clamp(0.125rem,1cqw,0.25rem)]">
              <div className="w-[clamp(1rem,4cqw,1.25rem)] h-[1px] bg-purple-500/40"></div>
              <button 
                onClick={() => setView('reviews')}
                className={`p-[clamp(0.375rem,2cqw,0.5rem)] w-full rounded-full transition-all duration-300 flex items-center justify-center ${view === 'reviews' ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.8)] scale-110' : 'text-amber-400/70 hover:text-amber-300 hover:bg-amber-900/30'}`}
              >
                <Star className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)]" />
              </button>
            </div>
          </div>

          {/* === ПРАВАЯ ЧАСТЬ (КОНТЕНТ) === */}
          <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
            <div className="relative flex-1 w-full overflow-hidden">
              
              {/* 1. ТАРО */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'tarot' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                <div className="w-[clamp(2rem,9cqw,2.5rem)] h-[clamp(2rem,9cqw,2.5rem)] rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                  <Diamond className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-amber-300" />
                </div>
                <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-bold text-amber-100 italic tracking-wide mb-[clamp(0.375rem,2cqw,0.5rem)]">{t.tarotTitle}</h3>
                <p className="font-serif text-[clamp(0.6rem,3.5cqw,0.75rem)] text-purple-100/90 leading-relaxed bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner">
                  {t.tarotText}
                </p>
              </div>

              {/* 2. АСТРОЛОГИЯ */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'astro' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                <div className="w-[clamp(2rem,9cqw,2.5rem)] h-[clamp(2rem,9cqw,2.5rem)] rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                  <Moon className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-amber-300" />
                </div>
                <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-bold text-amber-100 italic tracking-wide mb-[clamp(0.375rem,2cqw,0.5rem)]">{t.astroTitle}</h3>
                <p className="font-serif text-[clamp(0.6rem,3.5cqw,0.75rem)] text-purple-100/90 leading-relaxed bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner">
                  {t.astroText}
                </p>
              </div>

              {/* 3. НУМЕРОЛОГИЯ */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'numero' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                <div className="w-[clamp(2rem,9cqw,2.5rem)] h-[clamp(2rem,9cqw,2.5rem)] rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                  <TrendingUp className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-amber-300" />
                </div>
                <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-bold text-amber-100 italic tracking-wide mb-[clamp(0.375rem,2cqw,0.5rem)]">{t.numeroTitle}</h3>
                <p className="font-serif text-[clamp(0.6rem,3.5cqw,0.75rem)] text-purple-100/90 leading-relaxed bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner">
                  {t.numeroText}
                </p>
              </div>

              {/* 4. ЛИЧНЫЕ ПРИЕМЫ */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'personal' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                <div className="w-[clamp(2rem,9cqw,2.5rem)] h-[clamp(2rem,9cqw,2.5rem)] rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                  <UserCircle2 className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-amber-300" />
                </div>
                <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-bold text-amber-100 italic tracking-wide mb-[clamp(0.375rem,2cqw,0.5rem)]">{t.personalTitle}</h3>
                <p className="font-serif text-[clamp(0.6rem,3.5cqw,0.75rem)] text-purple-100/90 leading-relaxed bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner">
                  {t.personalText}
                </p>
              </div>

              {/* 5. ГРУППОВЫЕ ПРИЕМЫ */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'group' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                <div className="w-[clamp(2rem,9cqw,2.5rem)] h-[clamp(2rem,9cqw,2.5rem)] rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                  <Globe className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-amber-300" />
                </div>
                <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-bold text-amber-100 italic tracking-wide mb-[clamp(0.375rem,2cqw,0.5rem)]">{t.groupTitle}</h3>
                <p className="font-serif text-[clamp(0.6rem,3.5cqw,0.75rem)] text-purple-100/90 leading-relaxed bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner">
                  {t.groupText}
                </p>
              </div>

              {/* 6. ОТЗЫВЫ */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'reviews' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                <div className="w-[clamp(2rem,9cqw,2.5rem)] h-[clamp(2rem,9cqw,2.5rem)] rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                  <Star className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-amber-300" />
                </div>
                <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-bold text-amber-100 italic tracking-wide mb-[clamp(0.375rem,2cqw,0.5rem)]">{t.reviewsTitle}</h3>
                <div className="bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner relative mt-[clamp(0.125rem,1cqw,0.25rem)]">
                   <span className="absolute -top-[clamp(0.5rem,3cqw,0.75rem)] left-[clamp(0.375rem,2cqw,0.5rem)] text-[clamp(1.5rem,8cqw,2.25rem)] text-purple-500/40 font-serif">"</span>
                   <p className="font-serif text-[clamp(0.55rem,3cqw,0.6875rem)] text-purple-100/90 leading-relaxed italic relative z-10 px-[clamp(0.125rem,1cqw,0.25rem)] pt-[clamp(0.125rem,1cqw,0.25rem)]">
                     {t.reviewQuote}
                   </p>
                   <p className="text-[clamp(0.45rem,2.5cqw,0.5625rem)] text-amber-400/80 uppercase tracking-widest font-bold text-right mt-[clamp(0.5rem,3cqw,0.75rem)]">{t.reviewAuthor}</p>
                </div>
              </div>

              {/* 7. КОНТАКТЫ */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'contacts' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                <div className="w-[clamp(2rem,9cqw,2.5rem)] h-[clamp(2rem,9cqw,2.5rem)] rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                  <Phone className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-amber-300" />
                </div>
                <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-bold text-amber-100 italic tracking-wide mb-[clamp(0.375rem,2cqw,0.5rem)]">{t.contactsTitle}</h3>
                <div className="flex flex-col gap-[clamp(0.5rem,3cqw,0.75rem)] w-full mt-[clamp(0.125rem,1cqw,0.25rem)]">
                   <a href={CONTENT.esoteric.instLink} target="_blank" rel="noopener noreferrer" className="no-tilt bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner flex items-center gap-[clamp(0.5rem,3cqw,0.75rem)] hover:bg-purple-900/60 transition-colors group">
                     <InstagramIcon className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-pink-500 group-hover:scale-110 transition-transform" />
                     <span className="font-serif text-[clamp(0.7rem,3.5cqw,0.8125rem)] text-purple-100/90 tracking-wide">Instagram</span>
                   </a>
                   <a href={CONTENT.esoteric.tgChannelLink} target="_blank" rel="noopener noreferrer" className="no-tilt bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner flex items-center gap-[clamp(0.5rem,3cqw,0.75rem)] hover:bg-purple-900/60 transition-colors group">
                     <MessageCircle className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-blue-400 group-hover:scale-110 transition-transform" />
                     <span className="font-serif text-[clamp(0.7rem,3.5cqw,0.8125rem)] text-purple-100/90 tracking-wide">{t.tgChannel}</span>
                   </a>
                   <a href={CONTENT.esoteric.waLink} target="_blank" rel="noopener noreferrer" className="no-tilt bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm p-[clamp(0.625rem,3cqw,0.875rem)] rounded-2xl border border-purple-500/20 shadow-inner flex items-center gap-[clamp(0.5rem,3cqw,0.75rem)] hover:bg-purple-900/60 transition-colors group">
                     <Phone className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-green-400 group-hover:scale-110 transition-transform" />
                     <span className="font-serif text-[clamp(0.7rem,3.5cqw,0.8125rem)] text-purple-100/90 tracking-wide">WhatsApp</span>
                   </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// ОСНОВНОЙ КОМПОНЕНТ APP
// ==========================================
const App = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [sparks, setSparks] = useState([]);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('RU');
  
  const cardRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isFlippingRef = useRef(false);

  // Текущие переводы для App
  const t = TRANSLATIONS[lang] || TRANSLATIONS.RU;

  // Глобальный параллакс фона (Живые сферы)
  useEffect(() => {
    const handleGlobalMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = (clientX / window.innerWidth - 0.5) * 80;
      const y = (clientY / window.innerHeight - 0.5) * 80;
      
      setBgOffset({ x: -x, y: -y });
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, []);

  // Магнитный 3D наклон за курсором/пальцем
  const handlePointerMove = (e) => {
    if (isFlippingRef.current || !cardRef.current) return;
    if (isFlipped) return;
    
    if (e.target.closest('.no-tilt')) {
      setRotate({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    
    const rect = cardRef.current.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handlePointerLeave = () => {
    if (isFlippingRef.current) return;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const playFlipSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Игнорируем ошибки автоплея
    }
  };

  const handleFlip = () => {
    playFlipSound();
    
    isFlippingRef.current = true;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    
    setTimeout(() => { isFlippingRef.current = false; }, 700);

    if (!isFlipped) {
      const newSparks = Array.from({ length: 35 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.5);
        const distance = 80 + Math.random() * 100;
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * distance + 'px',
          ty: Math.sin(angle) * distance + 'px',
          wx1: (Math.random() - 0.5) * 100 + 'px',
          wy1: (Math.random() - 0.5) * 100 + 'px',
          wx2: (Math.random() - 0.5) * 200 + 'px',
          wy2: (Math.random() - 0.5) * 200 + 'px',
          wx3: (Math.random() - 0.5) * 300 + 'px',
          wy3: (Math.random() - 0.5) * 300 + 'px',
          wt: (20 + Math.random() * 20) + 's',
          size: Math.random() * 2.5 + 1.5 + 'px',
        };
      });
      setSparks(newSparks);
    } else {
      setSparks([]);
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 30, 40]); 
    }
    setIsFlipped(!isFlipped);
  };

  // Фиксированные стили модального окна и свечения (Тема "Эзотерик")
  const glowColor = 'rgba(147,51,234,0.6)';
  const modalTheme = { bg: 'rgba(147,51,234,0.15)', border: 'rgba(147,51,234,0.3)', icon: 'text-purple-400' };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.shareMsgTitle,
          text: t.shareMsgText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Шаринг отменен');
      }
    } else {
      handleCopy();
    }
  };

  const downloadVCard = () => {
    const info = { name: `${t.name1} ${t.name2}`, role: t.role, waLink: CONTENT.esoteric.waLink };
    
    let phoneStr = '';
    if (info.waLink) {
      const match = info.waLink.match(/\d+/);
      if (match) phoneStr = `+${match[0]}`;
    }

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${info.name}`,
      `TITLE:${info.role}`,
      phoneStr ? `TEL;TYPE=CELL,VOICE:${phoneStr}` : '',
      phoneStr ? `URL;TYPE=WhatsApp:https://wa.me/${phoneStr.replace('+', '')}` : '',
      `URL:${typeof window !== 'undefined' ? window.location.href : ''}`,
      'END:VCARD'
    ].filter(Boolean).join('\n');
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex flex-col font-sans select-none transition-all duration-500 relative overflow-hidden justify-center items-center p-4 sm:p-8">
      <style>{globalStyles}</style>

      {/* Фоновое свечение приложения (Живые сферы) - Отключены на мобильных */}
      <div 
        className="hidden sm:block fixed top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px)` }}
      ></div>
      <div 
        className="hidden sm:block fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px)` }}
      ></div>

      {/* КОНТЕЙНЕР ВИЗИТКИ И ЭЛЕМЕНТОВ УПРАВЛЕНИЯ */}
      <div className="w-full flex flex-col items-center relative z-40">
        
        {/* Сама визитка */}
        <div 
          ref={cardRef}
          className="relative z-10 w-full aspect-[1/1.6] sm:aspect-[1/1.5] cursor-pointer group animate-float touch-none @container"
          style={{ perspective: '1500px', maxWidth: 'min(26rem, 94vw, 52dvh)' }}
          onClick={handleFlip}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          {/* Искры (Magic Dust) */}
          {sparks.map(spark => (
            <div
              key={spark.id}
              className="spark-particle"
              style={{
                '--tx': spark.tx,
                '--ty': spark.ty,
                '--wx1': spark.wx1,
                '--wy1': spark.wy1,
                '--wx2': spark.wx2,
                '--wy2': spark.wy2,
                '--wx3': spark.wx3,
                '--wy3': spark.wy3,
                '--wt': spark.wt,
                width: spark.size,
                height: spark.size,
                left: '50%',
                top: '50%',
                marginTop: '-' + (parseFloat(spark.size) / 2) + 'px',
                marginLeft: '-' + (parseFloat(spark.size) / 2) + 'px'
              }}
            />
          ))}

          {/* Обертка для магнитного 3D наклона */}
          <div
            className="w-full h-full card-preserve-3d transition-transform duration-100 ease-out z-10 relative"
            style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
          >
            <div 
              className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] card-preserve-3d"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* Свечение для мобилок - Восстановлено без черного фона! */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ boxShadow: `0 0 60px ${glowColor}` }} 
              />
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ transform: 'rotateY(180deg)', boxShadow: `0 0 60px ${glowColor}` }} 
              />

              {/* Рендер standalone-шаблона с пробросом языка */}
              <EsotericCard lang={lang} />

              {/* Бегающий блик (Лицевая сторона) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden"
                style={{
                  background: `radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  mixBlendMode: 'overlay',
                  zIndex: 50,
                }}
              />

              {/* Бегающий блик (Обратная сторона) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden"
                style={{
                  transform: 'rotateY(180deg) translateZ(0)',
                  background: `radial-gradient(farthest-corner circle at ${100 - glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  mixBlendMode: 'overlay',
                  zIndex: 50,
                }}
              />
            </div>
          </div>
        </div>

        {/* ПАНЕЛЬ КНОПОК ПОД ВИЗИТКОЙ */}
        <div className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#181818]/95 sm:bg-white/5 sm:backdrop-blur-xl border border-white/20 sm:border-white/10 p-1.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50">
          <div className="flex items-center gap-1 px-1">
            {['RU', 'AM', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`relative px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-500 ${lang === l ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
              >
                {lang === l && (
                  <span className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.1)] pointer-events-none"></span>
                )}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-white/20 mx-1"></div>
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              setShowShare(true);
            }}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Поделиться"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              downloadVCard();
            }}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Сохранить контакт"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ПОДЕЛИТЬСЯ */}
      {showShare && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 sm:bg-black/40 sm:backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowShare(false)}
        >
          <div 
            className="bg-[#1a0a2e]/95 sm:!bg-[rgba(147,51,234,0.15)] sm:backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in zoom-in-95 duration-200 border" 
            style={{ borderColor: modalTheme.border }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowShare(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={`w-12 h-12 rounded-full bg-black/20 flex items-center justify-center mb-4 border ${modalTheme.icon.replace('text', 'border').replace('400', '500/30')}`}>
              <QrCode className={`w-6 h-6 ${modalTheme.icon}`} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{t.shareModalTitle}</h3>
            <p className="text-sm text-white/60 text-center mb-6 leading-relaxed">{t.shareModalDesc}</p>
            
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://nice-app.ru')}`} 
                alt="QR Code" 
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-black/20 hover:bg-black/40 border border-white/10 text-white font-medium py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? t.copied : t.copy}
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" />
                {t.shareBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;