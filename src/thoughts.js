// Aenigma - Thought Cabinet Database ("Lemari Pikiran")

export const THOUGHTS_CATALOG = [
  {
    id: 'clockmakers_paradox',
    name: "The Clockmaker's Paradox",
    category: 'Dialectic Horology',
    flavor: 'If Aurelia Vance designed pendulum escapements that measured moments before they physically transpired, did she build her own execution mechanism?',
    explanation: 'You find yourself staring at rotating brass gears until your retinas imprint with Roman numerals. Time is not a linear river; it is a coiled torsion spring waiting to snap backward.',
    requiredTicks: 3,
    tempDrawback: 'Logic -1 (Migraine from impossible gear ratios)',
    drawbacks: { logic: -1 },
    solution: 'Time is malleable when measured by murder. You perceive mechanical flaws in suspects testimonies before they even finish speaking.',
    buffs: { logic: 2, perception: 1, interfacing: 1 },
    unlockedBy: 'examine_pendulum'
  },
  {
    id: 'amnesia_as_defense',
    name: 'Amnesia as Self-Defense',
    category: 'Psychological Splinter',
    flavor: 'Why did you drink yourself into oblivion at the St. Irene tavern last night? Perhaps your sudden amnesia wasn\'t a drunken accident, but an act of mercy performed by your subconscious.',
    explanation: 'The past is a carnivorous animal waiting in the dark. By forgetting your own name and yesterday\'s horrors, you rendered the predator toothless.',
    requiredTicks: 4,
    tempDrawback: 'Morale -1 (Empty mirrors produce cold vertigo)',
    drawbacks: { painThreshold: -1 },
    solution: 'You accept the blank slate. What you forgot cannot be used to break your spirit.',
    buffs: { painThreshold: 2, endurance: 1 },
    unlockedBy: 'examine_mirror_or_start'
  },
  {
    id: 'metaphysics_of_rain',
    name: 'Metaphysics of Cold Rain',
    category: 'Atmospheric Melancholy',
    flavor: 'The rain drumming on the clocktower zinc roof sounds identical to a Morse code transmission from an extinct civilization.',
    explanation: 'Water carries electrical charges, industrial soot, and the whispered regrets of seven million harbor workers. If you listen closely enough, the storm tells you where the killer stepped.',
    requiredTicks: 3,
    tempDrawback: 'Conceptualization -1 (Distracted by dripping eaves)',
    drawbacks: { conceptualization: -1 },
    solution: 'The atmospheric pressure sharpens your intuitive sixth sense. The city speaks directly into your ear canal.',
    buffs: { esoterica: 2, encyclopedia: 1 },
    unlockedBy: 'examine_balcony'
  },
  {
    id: 'sovereign_bureaucrat',
    name: 'The Sovereign Bureaucrat',
    category: 'Civic Authority',
    flavor: 'The precinct chiefs think power resides in bayonets. But real power resides in the rubber stamp of an inspector who simply refuses to sign the autopsy transfer.',
    explanation: 'A badge is just tin. But procedural stubbornness? That is the immutable bedrock of civilization.',
    requiredTicks: 2,
    tempDrawback: 'Savoir Faire -1 (Stiff, unyielding posture)',
    drawbacks: { savoirFaire: -1 },
    solution: 'You exude the unshakeable weight of administrative dread. Witnesses fold before you even raise your voice.',
    buffs: { authority: 2, rhetoric: 1 },
    unlockedBy: 'talk_graves'
  },
  {
    id: 'nicotine_shroud',
    name: 'The Nicotine Shroud',
    category: 'Vice & Nerve',
    flavor: 'The smoke from an Astra Red does not merely coat your alveoli; it forms a defensive aerosol boundary between your soul and the decaying world.',
    explanation: 'Every inhalation is a tiny flame against the frost of District 7. You exhale gray clouds that obscure your trembling hands.',
    requiredTicks: 3,
    tempDrawback: 'Endurance -1 (Rattling smoker cough)',
    drawbacks: { endurance: -1 },
    solution: 'Steely nerves. In moments of panic, a single puff restores total tactical clarity.',
    buffs: { handEyeCoord: 2, suggestion: 1 },
    unlockedBy: 'use_cigarettes'
  }
];
