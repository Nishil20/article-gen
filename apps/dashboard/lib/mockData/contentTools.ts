// Mock data for content tools (Content Rewriter & Paragraph Generator)

export const toneOptions = [
  { value: "professional", label: "Professional", description: "Formal and business-appropriate" },
  { value: "casual", label: "Casual", description: "Relaxed and conversational" },
  { value: "friendly", label: "Friendly", description: "Warm and approachable" },
  { value: "authoritative", label: "Authoritative", description: "Expert and confident" },
  { value: "persuasive", label: "Persuasive", description: "Convincing and compelling" },
  { value: "informative", label: "Informative", description: "Educational and clear" },
];

export const lengthOptions = [
  { value: "shorter", label: "Shorter", description: "Condense the content (30% reduction)" },
  { value: "same", label: "Keep Similar", description: "Maintain approximate original length" },
  { value: "longer", label: "Longer", description: "Expand with more details (50% increase)" },
];

export const paragraphLengthOptions = [
  { value: "short", label: "Short", description: "2-3 sentences per paragraph" },
  { value: "medium", label: "Medium", description: "4-6 sentences per paragraph" },
  { value: "long", label: "Long", description: "7-10 sentences per paragraph" },
];

export const targetAudienceOptions = [
  { value: "general", label: "General Audience", description: "Accessible to everyone" },
  { value: "beginners", label: "Beginners", description: "No prior knowledge assumed" },
  { value: "intermediate", label: "Intermediate", description: "Some background knowledge" },
  { value: "experts", label: "Experts", description: "Advanced technical depth" },
  { value: "students", label: "Students", description: "Educational context" },
  { value: "professionals", label: "Professionals", description: "Industry practitioners" },
];

export const paragraphCountOptions = [
  { value: "1", label: "1 Paragraph" },
  { value: "2", label: "2 Paragraphs" },
  { value: "3", label: "3 Paragraphs" },
  { value: "5", label: "5 Paragraphs" },
  { value: "10", label: "10 Paragraphs" },
];
