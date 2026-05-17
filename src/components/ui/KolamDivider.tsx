const KolamDivider = () => (
  <div className="w-full flex justify-center py-8">
    <svg viewBox="0 0 400 60" className="w-full max-w-lg opacity-40">
      <line x1="0" y1="30" x2="150" y2="30" stroke="#D4AC0D" strokeWidth="1"/>
      <circle cx="200" cy="30" r="20" fill="none" stroke="#D4AC0D" strokeWidth="1"/>
      <circle cx="200" cy="30" r="12" fill="none" stroke="#C0392B" strokeWidth="1"/>
      <circle cx="200" cy="30" r="5" fill="#D4AC0D"/>
      <path d="M170,30 L200,10 L230,30 L200,50 Z" fill="none" stroke="#D4AC0D" strokeWidth="1"/>
      <line x1="250" y1="30" x2="400" y2="30" stroke="#D4AC0D" strokeWidth="1"/>
      {[155,160,165,170,230,235,240,245].map((x, i) => (
        <circle key={i} cx={x} cy={30} r="1.5" fill="#D4AC0D" opacity="0.6"/>
      ))}
    </svg>
  </div>
);

export default KolamDivider;
