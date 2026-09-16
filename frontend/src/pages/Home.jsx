import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Factory,
  Gauge,
  HardHat,
  Settings,
  ShieldCheck,
  Zap,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import products from '../data/products'
import ProductCard from '../components/ProductCard'

function Home() {
  const industries = [
    {
      name: 'Automotive',
      icon: Settings,
      description:
        'Precision components for vehicle systems, drivetrains and manufacturing lines.',
    },
    {
      name: 'Energy',
      icon: Zap,
      description:
        'Engineered solutions for demanding power generation and energy applications.',
    },
    {
      name: 'Construction',
      icon: HardHat,
      description:
        'Heavy-duty components built for construction equipment and infrastructure.',
    },
    {
      name: 'Manufacturing',
      icon: Factory,
      description:
        'Reliable components supporting modern production and automation systems.',
    },
  ]

  const capabilities = [
    'CNC machining',
    'Precision fabrication',
    'Quality inspection',
    'Custom component development',
    'Engineering consultation',
    'Bulk manufacturing',
  ]

  return (
    <main className="bg-neutral-950 text-white">

      {/* ================= HERO ================= */}

      <section className="min-h-screen flex items-center relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-10 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-white/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 w-full relative">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 text-xs text-neutral-400 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              ENGINEERING • MANUFACTURING • SUPPLY
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
              Precision
              <br />
              Engineered
              <br />
              <span className="text-neutral-500">
                For Industry.
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
              High-performance industrial components engineered for
              demanding applications across automotive, energy,
              construction and manufacturing.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-4 rounded-lg font-semibold hover:bg-neutral-200 transition"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 border border-white/20 px-7 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Request a Quote
                <ArrowUpRight size={18} />
              </Link>

            </div>

          </div>

          {/* Hero bottom information */}

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-white/10">

            <div className="py-6 border-r border-white/10">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm text-neutral-500 mt-1">
                Years Experience
              </p>
            </div>

            <div className="py-6 md:pl-8">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm text-neutral-500 mt-1">
                On-Time Delivery
              </p>
            </div>

            <div className="py-6 border-r border-white/10 md:border-l md:pl-8">
              <p className="text-3xl font-bold">42+</p>
              <p className="text-sm text-neutral-500 mt-1">
                Industrial Products
              </p>
            </div>

            <div className="py-6 md:pl-8">
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-neutral-500 mt-1">
                Countries Served
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FIND COMPONENT ================= */}

      <section className="py-24 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Component Finder
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Find the right component
              <br />
              for your application.
            </h2>

            <p className="text-neutral-400 mt-6 text-lg">
              Start with your industry or application and discover
              components designed for your specific requirements.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-12">

            {[
              'Power Transmission',
              'Fluid Control',
              'Machined Components',
            ].map((category) => (

              <Link
                key={category}
                to="/products"
                className="group border border-white/10 rounded-xl p-6 hover:bg-white hover:text-black transition"
              >

                <div className="flex items-center justify-between">

                  <Gauge size={24} />

                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                  />

                </div>

                <h3 className="text-xl font-semibold mt-10">
                  {category}
                </h3>

                <p className="text-sm text-neutral-500 group-hover:text-neutral-600 mt-2">
                  Explore components
                </p>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section
        id="products"
        className="py-24 bg-neutral-900/40 border-t border-white/10"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div>

              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Product Catalogue
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Built for demanding applications.
              </h2>

            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold"
            >
              View complete catalogue
              <ArrowRight size={16} />
            </Link>

          </div>


          <div className="grid md:grid-cols-2 gap-5 mt-12">

            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </div>

      </section>


      {/* ================= INDUSTRIES ================= */}

      <section
        id="industries"
        className="py-24 border-t border-white/10"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Industries
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Engineering across industries.
            </h2>

            <p className="text-neutral-400 mt-6 text-lg">
              Our components are designed to support critical
              industrial applications where performance and
              reliability matter.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">

            {industries.map((industry) => {

              const Icon = industry.icon

              return (
                <div
                  key={industry.name}
                  className="border border-white/10 rounded-xl p-6"
                >

                  <Icon size={28} />

                  <h3 className="text-xl font-semibold mt-8">
                    {industry.name}
                  </h3>

                  <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                    {industry.description}
                  </p>

                </div>
              )
            })}

          </div>

        </div>

      </section>


      {/* ================= CAPABILITIES ================= */}

      <section
        id="about"
        className="py-24 bg-neutral-900/40 border-y border-white/10"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16">

            <div>

              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Engineering Capabilities
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                From specification
                <br />
                to production.
              </h2>

              <p className="text-neutral-400 mt-6 text-lg leading-relaxed">
                ForgeX works with engineering and procurement teams
                to transform technical requirements into reliable,
                production-ready components.
              </p>

              <Link
                to="/quote"
                className="inline-flex items-center gap-2 mt-8 bg-white text-black px-6 py-3 rounded-lg font-semibold"
              >
                Discuss your requirement
                <ArrowUpRight size={17} />
              </Link>

            </div>


            <div className="grid sm:grid-cols-2 gap-3">

              {capabilities.map((capability) => (

                <div
                  key={capability}
                  className="flex items-center gap-3 border border-white/10 rounded-lg p-4"
                >

                  <CheckCircle2
                    size={18}
                    className="text-neutral-400 shrink-0"
                  />

                  <span className="text-sm">
                    {capability}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================= CERTIFICATIONS ================= */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">

            <ShieldCheck
              size={42}
              className="mx-auto"
            />

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mt-6">
              Quality & Compliance
            </p>

            <h2 className="text-4xl font-bold mt-4">
              Built around quality.
            </h2>

            <p className="text-neutral-400 mt-5">
              Manufacturing processes designed around consistent
              quality, traceability and engineering requirements.
            </p>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">

            {[
              'ISO 9001',
              'ISO 14001',
              'IATF 16949',
              'CE Compliant',
            ].map((certification) => (

              <div
                key={certification}
                className="border border-white/10 rounded-xl p-8 text-center"
              >

                <p className="text-2xl font-bold">
                  {certification}
                </p>

                <p className="text-xs text-neutral-500 mt-2">
                  Quality Standard
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= QUOTE CTA ================= */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-16">

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Start a Project
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mt-5 max-w-3xl">
              Have a component requirement?
              <br />
              Let's engineer it.
            </h2>

            <p className="text-neutral-400 mt-6 max-w-2xl text-lg">
              Share your drawings, specifications or application
              requirements and our team will review your request.
            </p>

            <Link
              to="/quote"
              className="inline-flex items-center gap-2 mt-8 bg-white text-black px-7 py-4 rounded-lg font-semibold"
            >
              Build Your Requirement
              <ArrowUpRight size={18} />
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10 py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-10">

            <div className="md:col-span-2">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 bg-white text-black rounded-md flex items-center justify-center font-black">
                  F
                </div>

                <div>
                  <div className="font-bold">
                    FORGEX
                  </div>

                  <div className="text-[10px] text-neutral-500 tracking-[0.2em]">
                    INDUSTRIAL SOLUTIONS
                  </div>
                </div>

              </div>

              <p className="text-neutral-500 text-sm mt-5 max-w-md">
                Precision-engineered industrial components and
                manufacturing solutions for demanding applications.
              </p>

            </div>


            <div>

              <p className="font-semibold mb-4">
                Company
              </p>

              <div className="space-y-3 text-sm text-neutral-500">

                <Link
                  to="/"
                  className="block hover:text-white"
                >
                  About
                </Link>

                <Link
                  to="/products"
                  className="block hover:text-white"
                >
                  Products
                </Link>

                <Link
                  to="/quote"
                  className="block hover:text-white"
                >
                  Request Quote
                </Link>

              </div>

            </div>


            <div>

              <p className="font-semibold mb-4">
                Contact
              </p>

              <div className="space-y-3 text-sm text-neutral-500">

                <p>sales@forgex.example</p>
                <p>+91 90000 00000</p>
                <p>Hyderabad, India</p>

              </div>

            </div>

          </div>


          <div className="border-t border-white/10 mt-12 pt-6 text-sm text-neutral-600">
            © 2026 ForgeX Industrial Solutions. Portfolio Project.
          </div>

        </div>

      </footer>

    </main>
  )
}

export default Home