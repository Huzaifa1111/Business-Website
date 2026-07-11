const fs = require('fs');

const files = [
  'e:/Business-Website/app/admin/home/page.tsx',
  'e:/Business-Website/app/admin/about/page.tsx',
  'e:/Business-Website/app/admin/services/page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace <FormGroup label="Heading"> with the color inputs AND the Heading in all SectionCards
  // But we need to make sure we don't duplicate it.
  
  // A generic way to inject: find <SectionCard ...> and insert right after it if it has a direct child.
  // Actually, searching for <FormGroup label="Heading"> or similar first fields:
  // e.g. <FormGroup label="Heading">
  // We can just replace the first <FormGroup in each <SectionCard> ... wait, regex is easier:
  
  const sections = {
    'intro': 'intro',
    'whyChooseUs': 'whyChooseUs',
    'cta': 'cta',
    'testimonials': 'testimonials',
    'overview': 'overview',
    'mission': 'mission',
    'vision': 'vision',
    'values': 'values',
    'hero': 'hero',
    'process': 'process'
  };

  for (const [key, sectionName] of Object.entries(sections)) {
    // Look for <Input value={data.${sectionName}.heading}
    // Or similar fields to insert before them
    const regexHeading = new RegExp(`(<FormGroup[^>]*>\\s*<Input[^>]*value=\\{data\\.${sectionName}\\.(heading|eyebrow|statement)\\})`, 'g');
    
    content = content.replace(regexHeading, (match) => {
      // Avoid duplication
      if (content.includes(`updateSection("${sectionName}", "textColor"`)) return match; // Already added? Actually this check is global per file, might not work.
      
      const inject = `
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Text Color">
            <Input type="color" value={data.${sectionName}.textColor || "#252118"} className="h-11 p-1" onChange={(e) => updateSection("${sectionName}", "textColor", e.target.value)} />
          </FormGroup>
          <FormGroup label="Accent Color">
            <Input type="color" value={data.${sectionName}.accentColor || "#4f46e5"} className="h-11 p-1" onChange={(e) => updateSection("${sectionName}", "accentColor", e.target.value)} />
          </FormGroup>
        </div>
      `;
      // Check if already injected
      if (match.includes("Text Color")) return match; 
      
      return inject + match;
    });
    
    // For pages that use setData(p => p ? ...)
    const regexSetData = new RegExp(`(<FormGroup[^>]*>\\s*<Input[^>]*value=\\{data\\.${sectionName}\\.(heading|eyebrow|statement)\\})`, 'g');
    content = content.replace(regexSetData, (match) => {
      if (match.includes("Text Color") || match.includes("updateSection")) return match; // Handled by first replace or already injected
      
      const inject = `
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Text Color">
            <Input type="color" value={data.${sectionName}.textColor || "#252118"} className="h-11 p-1" onChange={(e) => setData(p => p ? ({ ...p, ${sectionName}: { ...p.${sectionName}, textColor: e.target.value } }) : null)} />
          </FormGroup>
          <FormGroup label="Accent Color">
            <Input type="color" value={data.${sectionName}.accentColor || "#4f46e5"} className="h-11 p-1" onChange={(e) => setData(p => p ? ({ ...p, ${sectionName}: { ...p.${sectionName}, accentColor: e.target.value } }) : null)} />
          </FormGroup>
        </div>
      `;
      return inject + match;
    });
  }

  fs.writeFileSync(file, content, 'utf8');
});
