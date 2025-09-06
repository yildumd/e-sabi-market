// client/src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Fresh Groceries from <span className="text-green-400">Local Vendors</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Shop from multiple Nigerian grocery vendors in one place. Fresh products, delivered to your door.
          </p>
          <p className="text-lg mb-10 text-green-100">
            A product of <strong>Sales Drive Limited</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/products" 
              className="px-8 py-4 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors text-lg"
            >
              Browse Products
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-xl text-gray-700">Local Vendors</div>
              <p className="text-gray-500 mt-2">Supporting small businesses across Nigeria</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">1,000+</div>
              <div className="text-xl text-gray-700">Products</div>
              <p className="text-gray-500 mt-2">Fresh groceries and household items</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">5,000+</div>
              <div className="text-xl text-gray-700">Happy Customers</div>
              <p className="text-gray-500 mt-2">Served across major Nigerian cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose E-Sabi Market?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-white">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Products</h3>
              <p className="text-gray-600">Direct from local vendors to ensure freshness and support local businesses.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-white">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Vendor Cart</h3>
              <p className="text-gray-600">Shop from different vendors but checkout with a single cart and payment.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-white">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Distance-based delivery fees ensure fair pricing and quick delivery to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How E-Sabi Market Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Browse Vendors</h3>
              <p className="text-gray-600">Explore local grocery vendors and their products all in one place.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Add to Cart</h3>
              <p className="text-gray-600">Select items from different vendors and add them to your single cart.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Checkout</h3>
              <p className="text-gray-600">Complete your purchase with secure payment and distance-based delivery fees.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Delivery</h3>
              <p className="text-gray-600">Receive your fresh groceries at your doorstep from local vendors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-700 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold">AA</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Adeola A.</h4>
                  <p className="text-green-200">Lagos</p>
                </div>
              </div>
              <p className="italic">"E-Sabi Market has changed how I shop for groceries. I can now support local vendors while enjoying the convenience of online shopping."</p>
            </div>
            
            <div className="bg-green-700 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold">CJ</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Chinedu J.</h4>
                  <p className="text-green-200">Abuja</p>
                </div>
              </div>
              <p className="italic">"The multi-vendor cart is genius! I can shop from my favorite vendors all at once. Delivery is always prompt and professional."</p>
            </div>
            
            <div className="bg-green-700 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold">FO</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Funke O.</h4>
                  <p className="text-green-200">Ibadan</p>
                </div>
              </div>
              <p className="italic">"As a vendor, E-Sabi Market has helped me reach more customers than I ever could with my physical store alone. The platform is easy to use."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience convenient grocery shopping?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerians who are shopping smarter with E-Sabi Market.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link 
              to="/products" 
              className="px-8 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
          <p className="mt-8 text-orange-200">
            A product of <strong>Sales Drive Limited</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;