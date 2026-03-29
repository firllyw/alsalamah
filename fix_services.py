import re

with open('src/components/sections/ServicesSection.tsx', 'r') as f:
    content = f.read()

# Replace OUR SERVICE
content = re.sub(
    r'>\s*OUR SERVICE\s*</div>',
    '>\n            {data?.title || "OUR SERVICE"}\n          </div>',
    content
)

# Replace BY ALIGNING OUR OPERATIONS...
content = re.sub(
    r'>\s*BY ALIGNING OUR OPERATIONS WITH THE HIGHEST STANDARDS,\s*</motion\.h3>',
    '>\n            {data?.subtitle || "BY ALIGNING OUR OPERATIONS WITH THE HIGHEST STANDARDS,"}\n          </motion.h3>',
    content
)

# Replace AST has built a 20-year track...
content = re.sub(
    r'>\s*AST has built a 20-year track<br />\s*record as a partner businesses<br />\s*</motion\.h2>',
    '>\n            {data?.mainContent || <>AST has built a 20-year track<br />record as a partner businesses<br /></>}\n          </motion.h2>',
    content
)

with open('src/components/sections/ServicesSection.tsx', 'w') as f:
    f.write(content)
