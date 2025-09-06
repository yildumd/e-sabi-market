import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold">E</span>
              </div>
              <span className="text-xl font-bold">E-Sabi Market</span>
            </div>
            <p className="text-green-100 mb-4">
              Bringing Nigerian grocery vendors online. Shop from multiple vendors in a single cart.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-100 hover:text-white">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-green-100 hover:text-white">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-green-100 hover:text-white">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-green-100 hover:text-white">Home</Link></li>
              <li><Link to="/vendors" className="text-green-100 hover:text-white">Vendors</Link></li>
              <li><Link to="/products" className="text-green-100 hover:text-white">Products</Link></li>
              <li><Link to="/about" className="text-green-100 hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-100 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-green-100 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-green-100 hover:text-white">Delivery Information</a></li>
              <li><a href="#" className="text-green-100 hover:text-white">Returns Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-green-100 mb-4">Subscribe to our newsletter for updates</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} E-Sabi Market. A product of <strong>Sales Drive Limited</strong>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;