import re

with open('src/components/sections/ContactSection.tsx', 'r') as f:
    content = f.read()

# Replace Contact Title Alignment
content = re.sub(
    r'<h2 className="text-3xl font-bold text-white mb-4">',
    '<h2 dir="auto" className="text-3xl font-bold text-white mb-4">',
    content
)

# Replace Head Office Title Alignment
content = re.sub(
    r'<h3 className="text-2xl font-bold text-white">',
    '<h3 dir="auto" className="text-2xl font-bold text-white">',
    content
)

# Replace Representative Office Title Alignment (since it matches the same pattern, doing a replace all handles both)

# Replace Part of alignment
content = re.sub(
    r'<span className="text-white text-xl font-medium">',
    '<span dir="auto" className="text-white text-xl font-medium">',
    content
)

with open('src/components/sections/ContactSection.tsx', 'w') as f:
    f.write(content)
