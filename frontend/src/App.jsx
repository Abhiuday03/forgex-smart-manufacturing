import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <main className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-32 w-full">

          <div className="max-w-4xl">

            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-6">
              Industrial Components & Solutions
            </p>

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

              <button className="bg-white text-black px-7 py-4 rounded-lg font-semibold hover:bg-neutral-200 transition">
                Explore Products
              </button>

              <button className="border border-white/20 px-7 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
                Request a Quote
              </button>

            </div>

          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">

            <div>
              <p className="text-3xl font-bold">25+</p>
              <p className="text-sm text-neutral-500 mt-1">
                Years Engineering
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">120+</p>
              <p className="text-sm text-neutral-500 mt-1">
                Business Customers
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm text-neutral-500 mt-1">
                Product Categories
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">ISO</p>
              <p className="text-sm text-neutral-500 mt-1">
                9001 Certified
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}

export default App