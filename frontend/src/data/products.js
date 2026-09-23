const products = [
  {
    id: 1,
    name: 'Industrial Gear Assemblies',
    slug: 'industrial-gear-assemblies',
    category: 'Power Transmission',
    shortDescription:
      'Precision-manufactured gear assemblies designed for high-load industrial applications.',
    description:
      'ForgeX industrial gear assemblies are designed for applications requiring reliable torque transmission, dimensional accuracy and long operating life. Components can be manufactured according to customer drawings and application requirements.',
    applications: [
      'Automotive',
      'Heavy Machinery',
      'Manufacturing',
    ],
    material: 'Alloy Steel',
    manufacturing: 'CNC Machining',
    leadTime: '3–5 weeks',
    specifications: [
      {
        name: 'Material',
        value: 'Alloy Steel',
      },
      {
        name: 'Manufacturing',
        value: 'CNC Machining',
      },
      {
        name: 'Tolerance',
        value: 'Up to ±0.02 mm',
      },
      {
        name: 'Surface Finish',
        value: 'Ra 1.6 μm',
      },
    ],
  },

  {
    id: 2,
    name: 'Hydraulic Valve Systems',
    slug: 'hydraulic-valve-systems',
    category: 'Fluid Control',
    shortDescription:
      'Reliable hydraulic valve systems engineered for accurate flow and pressure control.',
    description:
      'Hydraulic valve systems engineered for industrial equipment requiring dependable fluid control. Configurations can be adapted to application pressure, flow and installation requirements.',
    applications: [
      'Construction',
      'Industrial Automation',
      'Heavy Equipment',
    ],
    material: 'Stainless Steel',
    manufacturing: 'Precision Machining',
    leadTime: '4–6 weeks',
    specifications: [
      {
        name: 'Material',
        value: 'Stainless Steel',
      },
      {
        name: 'Manufacturing',
        value: 'Precision Machining',
      },
      {
        name: 'Pressure Rating',
        value: 'Up to 350 bar',
      },
      {
        name: 'Port Configuration',
        value: 'Custom',
      },
    ],
  },

  {
    id: 3,
    name: 'Precision Shaft Components',
    slug: 'precision-shaft-components',
    category: 'Machined Components',
    shortDescription:
      'High-precision shafts manufactured for demanding mechanical and rotating applications.',
    description:
      'Precision shaft components manufactured according to engineering drawings and dimensional requirements. Suitable for rotating machinery, automation equipment and industrial mechanical systems.',
    applications: [
      'Automotive',
      'Robotics',
      'Industrial Machinery',
    ],
    material: 'Carbon Steel',
    manufacturing: 'CNC Turning',
    leadTime: '2–4 weeks',
    specifications: [
      {
        name: 'Material',
        value: 'Carbon Steel',
      },
      {
        name: 'Manufacturing',
        value: 'CNC Turning',
      },
      {
        name: 'Diameter Range',
        value: '10–150 mm',
      },
      {
        name: 'Tolerance',
        value: 'Up to ±0.01 mm',
      },
    ],
  },

  {
    id: 4,
    name: 'Structural Fastener Kits',
    slug: 'structural-fastener-kits',
    category: 'Industrial Hardware',
    shortDescription:
      'Industrial-grade fastening solutions designed for structural and heavy-duty applications.',
    description:
      'Industrial fastening kits designed for demanding structural and mechanical applications. Configurations can be supplied according to project specifications and required standards.',
    applications: [
      'Construction',
      'Infrastructure',
      'Engineering',
    ],
    material: 'High-Strength Steel',
    manufacturing: 'Cold Forming',
    leadTime: '2–3 weeks',
    specifications: [
      {
        name: 'Material',
        value: 'High-Strength Steel',
      },
      {
        name: 'Manufacturing',
        value: 'Cold Forming',
      },
      {
        name: 'Strength Grade',
        value: '8.8 / 10.9',
      },
      {
        name: 'Coating',
        value: 'Zinc Plated',
      },
    ],
  },
]

export default products