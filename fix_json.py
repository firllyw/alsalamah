import json

def update_json(filename, updates):
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Update Contact Section
    if 'contact' not in data or data['contact'] is None:
        data['contact'] = {}

    for k, v in updates['contact'].items():
        data['contact'][k] = v

    # Update Services Section
    if 'servicesSection' not in data or data['servicesSection'] is None:
        data['servicesSection'] = {}

    for k, v in updates['servicesSection'].items():
        data['servicesSection'][k] = v

    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

ar_updates = {
    'contact': {
        'title': 'اتصل بنا:',
        'headOfficeTitle': 'المكتب الرئيسي',
        'repOfficeTitle': 'المكتب التمثيلي',
        'partOf': 'جزء من'
    },
    'servicesSection': {
        'title': 'خدماتنا',
        'subtitle': 'من خلال مواءمة عملياتنا مع أعلى المعايير،',
        'mainContent': 'لقد بنت AST سجلاً حافلاً لمدة 20 عامًا<br/>كشريك للأعمال'
    }
}

en_updates = {
    'contact': {
        'title': 'CONTACT:',
        'headOfficeTitle': 'Head Office',
        'repOfficeTitle': 'Representative Office',
        'partOf': 'Part of'
    },
    'servicesSection': {
        'title': 'OUR SERVICE',
        'subtitle': 'BY ALIGNING OUR OPERATIONS WITH THE HIGHEST STANDARDS,',
        'mainContent': 'AST has built a 20-year track<br/>record as a partner businesses<br/>'
    }
}

update_json('public/data_ar.json', ar_updates)
update_json('public/data.json', en_updates)
