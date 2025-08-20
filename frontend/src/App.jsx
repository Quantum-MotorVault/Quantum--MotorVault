import { useEffect, useMemo, useState } from 'react'

const api = {
	cars: async (params = {}) => {
		const qs = new URLSearchParams(params).toString()
		const res = await fetch(`/api/cars?${qs}`)
		return res.json()
	},
	featured: async () => (await fetch('/api/featured')).json(),
	recent: async () => (await fetch('/api/recent')).json(),
}

const makers = [
	'All','Alfa Romeo','Audi','Bentley','BMW','Cadillac','Chevrolet','Dodge','Ferrari','Ford','GMC','Honda','Hyundai','Infiniti','Jaguar','KIA','Land Rover','Lexus','Maserati','Mercedes Benz','Mitsubishi','Nissan','Porsche','Range Rover','Renault','Subaru','Suzuki','Toyota','Volkswagen','Volvo','Tesla','Polestar'
]

function Nav() {
	return (
		<nav className="nav">
			<div className="container nav-inner">
				<div className="brand">
					<div className="brand-logo">Q</div>
					<span>Quantum MotorVault</span>
				</div>
				<div className="nav-links">
					<a href="#">Home</a>
					<a href="#about">About</a>
					<a href="#dealer">Dealer</a>
					<a href="#news">News</a>
					<a href="#contact">Contact</a>
				</div>
				<div className="actions">
					<button className="btn btn-primary">SELL YOUR CAR</button>
					<button className="btn">SIGN IN</button>
				</div>
			</div>
		</nav>
	)
}

function Hero() {
	return (
		<section className="hero container">
			<h1>Explore, Choose, Own</h1>
			<p>
				Are you ready to embark on an exciting journey of car ownership? Look no further than our premier marketplace for pre-owned cars with our vast selection of vehicles.
			</p>
		</section>
	)
}

function Filters({ onSearch }) {
	const [q, setQ] = useState('')
	const [maker, setMaker] = useState('')
	const [model, setModel] = useState('')
	const [price, setPrice] = useState([0, 1000000])
	const [mileage, setMileage] = useState([0, 500000])

	const submit = () => onSearch({ q, maker, model, priceMin: price[0], priceMax: price[1], mileageMin: mileage[0], mileageMax: mileage[1] })

	return (
		<div className="container">
			<div className="filter-bar">
				<input className="filter-input" placeholder="What Car Are You Looking For?" value={q} onChange={e => setQ(e.target.value)} />
				<select className="select" value={maker} onChange={e => setMaker(e.target.value)}>
					{makers.map(m => (<option key={m} value={m === 'All' ? '' : m}>{m}</option>))}
				</select>
				<input className="select" placeholder="Model" value={model} onChange={e => setModel(e.target.value)} />
				<select className="select" value={price.join('-')} onChange={e => setPrice(e.target.value.split('-').map(Number))}>
					<option value="0-1000000">Price (AED)</option>
					<option value="0-25000">0 - 25,000</option>
					<option value="25000-50000">25,000 - 50,000</option>
					<option value="50000-100000">50,000 - 100,000</option>
					<option value="100000-1000000">100,000+</option>
				</select>
				<select className="select" value={mileage.join('-')} onChange={e => setMileage(e.target.value.split('-').map(Number))}>
					<option value="0-500000">Mileage</option>
					<option value="0-50000">0 - 50K</option>
					<option value="50000-150000">50K - 150K</option>
					<option value="150000-500000">150K+</option>
				</select>
				<button className="icon-btn" onClick={submit} aria-label="Search">🔍</button>
			</div>
		</div>
	)
}

function BrandStrip() {
	const logos = useMemo(() => [
		'https://images.unsplash.com/photo-1549921296-3a6b7f6f3e49?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1617814078719-38f32d63a20b?q=80&w=1200&auto=format&fit=crop',
	], [] )
	return (
		<div className="container brand-strip">
			{logos.map((src, i) => (
				<div className="brand-logo-item" key={i}>
					<img src={src} alt="brand" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:20,opacity:.7}} />
				</div>
			))}
		</div>
	)
}

function CarsGrid({ title, cars }) {
	return (
		<section className="container section">
			<h2>{title}</h2>
			<div className="grid">
				{cars.map(car => (
					<div className="card" key={car.id}>
						<img src={car.image} alt={car.title} />
						<div className="card-body">
							<div className="card-title">{car.title}</div>
							<div className="card-meta">
								<span>AED {car.price.toLocaleString()}</span>
								<span>{car.year}</span>
								<span>{car.mileageKm.toLocaleString()} KM</span>
								<span>{car.type}</span>
								<span>{car.transmission}</span>
								<span>{car.cylinders} Cylinder</span>
								<span>{car.location}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

function Footer(){
	return (
		<footer className="footer">
			<div className="container cols">
				<div>
					<h3 style={{marginTop:0}}>Quantum MotorVault</h3>
					<p>Car classifieds inspired by the Sharjah automotive marketplace.</p>
				</div>
				<div>
					<h4>Navigation</h4>
					<ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:8}}>
						<li><a href="#">Home</a></li>
						<li><a href="#about">About</a></li>
						<li><a href="#contact">Contact</a></li>
						<li><a href="#faqs">FAQs</a></li>
					</ul>
				</div>
				<div>
					<h4>Showroom</h4>
					<ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:8}}>
						<li><a href="#dealer">Dealer</a></li>
						<li><a href="#become">Become a Dealer</a></li>
						<li><a href="#signin">Dealer Sign in</a></li>
					</ul>
				</div>
				<div>
					<h4>Company</h4>
					<p>© {new Date().getFullYear()} Quantum MotorVault</p>
				</div>
			</div>
		</footer>
	)
}

export default function App(){
	const [featured, setFeatured] = useState([])
	const [recent, setRecent] = useState([])

	useEffect(() => {
		api.featured().then(d => setFeatured(d.results))
		api.recent().then(d => setRecent(d.results))
	}, [])

	const [searchResults, setSearchResults] = useState([])
	const handleSearch = async (params) => {
		const d = await api.cars(params)
		setSearchResults(d.results)
	}

	return (
		<>
			<Nav />
			<Hero />
			<Filters onSearch={handleSearch} />
			<BrandStrip />
			{searchResults.length > 0 && (
				<CarsGrid title="Search Results" cars={searchResults} />
			)}
			<CarsGrid title="Discover Our Featured Cars Collection" cars={featured} />
			<CarsGrid title="Recently Added" cars={recent} />
			<Footer />
		</>
	)
}
