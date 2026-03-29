import re

with open('src/components/sections/ContactSection.tsx', 'r') as f:
    content = f.read()

# Replace CONTACT:
content = re.sub(
    r'<h2 className="text-3xl font-bold text-white mb-4">CONTACT:</h2>',
    '<h2 className="text-3xl font-bold text-white mb-4">{data?.title || "CONTACT:"}</h2>',
    content
)

# Replace Head Office
content = re.sub(
    r'<h3 className="text-2xl font-bold text-white">Head Office</h3>',
    '<h3 className="text-2xl font-bold text-white">{data?.headOfficeTitle || "Head Office"}</h3>',
    content
)

# Replace Representative Office
content = re.sub(
    r'<h3 className="text-2xl font-bold text-white">Representative Office</h3>',
    '<h3 className="text-2xl font-bold text-white">{data?.repOfficeTitle || "Representative Office"}</h3>',
    content
)

# Replace Part of
content = re.sub(
    r'<span className="text-white text-xl font-medium">Part of</span>',
    '<span className="text-white text-xl font-medium">{data?.partOf || "Part of"}</span>',
    content
)

with open('src/components/sections/ContactSection.tsx', 'w') as f:
    f.write(content)
