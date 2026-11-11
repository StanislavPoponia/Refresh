interface ReeferIllustrationProps {
  className?: string;
}

/**
 * Інлайн-SVG вантажівки-рефрижератора в кольорах сайту.
 * Заглушка до появи реальних фото (їх можна покласти в src/assets/images/).
 */
export function ReeferIllustration({ className }: ReeferIllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 280"
      role="img"
      aria-label="Вантажівка-рефрижератор"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="reefer-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e3f4fd" />
        </linearGradient>
      </defs>
      <ellipse cx="260" cy="248" rx="240" ry="14" fill="#e6ebf0" />

      {/* Рефрижераторний фургон */}
      <rect
        x="20"
        y="40"
        width="320"
        height="170"
        rx="10"
        fill="url(#reefer-box)"
        stroke="#8fd0f2"
        strokeWidth="3"
      />
      {/* Холодильна установка */}
      <rect x="40" y="56" width="70" height="46" rx="6" fill="#4aa8d8" />
      <circle cx="75" cy="79" r="15" fill="#e3f4fd" />
      <path
        d="M75 66v26M62 79h26M66 70l18 18M84 70L66 88"
        stroke="#2b7fb0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="20" y="186" width="320" height="24" fill="#9aa5b1" opacity="0.5" />
      <text
        x="190"
        y="150"
        fontFamily="Montserrat, sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="#2b7fb0"
        textAnchor="middle"
      >
        REFRIGERATOR
      </text>

      {/* Кабіна */}
      <path d="M350 90h70l50 52v68H350z" fill="#4aa8d8" />
      <path d="M366 104h46l34 36h-80z" fill="#e3f4fd" />
      <rect x="350" y="186" width="120" height="24" fill="#2b7fb0" />

      {/* Рама й колеса */}
      <rect x="20" y="206" width="450" height="12" rx="4" fill="#3e4c59" />
      {[90, 160, 400].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="224" r="28" fill="#1f2933" />
          <circle cx={cx} cy="224" r="13" fill="#9aa5b1" />
          <circle cx={cx} cy="224" r="5" fill="#3e4c59" />
        </g>
      ))}
    </svg>
  );
}
