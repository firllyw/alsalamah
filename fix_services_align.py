import re

with open('src/components/sections/ServicesSection.tsx', 'r') as f:
    content = f.read()

# Replace OUR SERVICE alignment
content = re.sub(
    r'<div\n\s*className="uppercase text-\[#ffbd59\] text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest pt-6 min-w-\[160px\] whitespace-nowrap"',
    '<div\n            dir="auto"\n            className="uppercase text-[#ffbd59] text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest pt-6 min-w-[160px] whitespace-nowrap"',
    content
)

# Replace BY ALIGNING alignment
content = re.sub(
    r'<motion\.h3\n\s*className="text-white/90 text-xs md:text-sm lg:text-base font-medium mb-2 tracking-wide uppercase"',
    '<motion.h3\n            dir="auto"\n            className="text-white/90 text-xs md:text-sm lg:text-base font-medium mb-2 tracking-wide uppercase"',
    content
)

# Replace AST has built alignment
content = re.sub(
    r'<motion\.h2\n\s*className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-6 leading-normal"',
    '<motion.h2\n            dir="auto"\n            className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-6 leading-normal"',
    content
)

with open('src/components/sections/ServicesSection.tsx', 'w') as f:
    f.write(content)
