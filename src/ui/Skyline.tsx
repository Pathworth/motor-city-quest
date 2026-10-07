// A simple code-drawn Detroit skyline silhouette: Renaissance Center in the middle, towers either side, the river below.
export function Skyline() {
  return (
    <svg
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 w-full"
      viewBox="0 0 1600 300"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1020" stopOpacity="0" />
          <stop offset="1" stopColor="#060a16" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#15264a" />
          <stop offset="1" stopColor="#0a1020" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1600" height="300" fill="url(#sky)" />
      <g fill="#070c1a">
        {/* far left low buildings */}
        <rect x="0" y="210" width="90" height="90" />
        <rect x="95" y="190" width="60" height="110" />
        <rect x="160" y="225" width="70" height="75" />
        {/* Fisher-style tower */}
        <rect x="245" y="120" width="54" height="180" />
        <polygon points="245,120 272,92 299,120" />
        <rect x="305" y="200" width="60" height="100" />
        {/* Penobscot-style stepped tower */}
        <rect x="380" y="150" width="90" height="150" />
        <rect x="400" y="105" width="50" height="50" />
        <rect x="418" y="78" width="14" height="30" />
        <rect x="480" y="195" width="55" height="105" />
        {/* Guardian-style */}
        <rect x="545" y="130" width="60" height="170" />
        <polygon points="545,130 575,110 605,130" />
        <rect x="612" y="205" width="80" height="95" />
        {/* Renaissance Center: four towers and the tall center */}
        <rect x="705" y="165" width="42" height="135" />
        <rect x="752" y="165" width="42" height="135" />
        <rect x="770" y="40" width="60" height="260" rx="6" />
        <rect x="806" y="165" width="42" height="135" />
        <rect x="853" y="165" width="42" height="135" />
        {/* One Detroit Center style with spires */}
        <rect x="915" y="120" width="80" height="180" />
        <polygon points="915,120 935,95 955,120" />
        <polygon points="955,120 975,95 995,120" />
        <rect x="1005" y="200" width="60" height="100" />
        <rect x="1075" y="160" width="70" height="140" />
        <rect x="1095" y="135" width="30" height="25" />
        <rect x="1155" y="215" width="80" height="85" />
        {/* Book Tower style */}
        <rect x="1245" y="140" width="48" height="160" />
        <rect x="1255" y="118" width="28" height="22" />
        <rect x="1300" y="200" width="70" height="100" />
        <rect x="1380" y="180" width="55" height="120" />
        <rect x="1445" y="220" width="80" height="80" />
        <rect x="1530" y="200" width="70" height="100" />
      </g>
      {/* window lights */}
      <g fill="#d4a63a" opacity="0.55">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 250 + ((i * 97) % 1300)
          const y = 150 + ((i * 53) % 130)
          return <rect key={i} x={x} y={y} width="3" height="4" />
        })}
      </g>
      {/* the river */}
      <rect x="0" y="292" width="1600" height="8" fill="url(#river)" />
    </svg>
  )
}
