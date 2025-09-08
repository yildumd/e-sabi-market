import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storeImage, setStoreImage] = useState(null);
  const [storeImagePreview, setStoreImagePreview] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const userType = watch('userType');
  const password = watch('password');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoreImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onend = () => {
        setStoreImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setIsError(false);
    setMessage('');
    
    try {
      let response;
      
      if (data.userType === 'vendor') {
        // Create a regular JavaScript object for vendor registration
        const vendorData = {
          name: data.name,
          email: data.email,
          password: data.password,
          businessName: data.storeName,
          phone: data.storePhone,
          storeAddress: data.storeAddress,
          deliveryPricingPerKm: 50 // Default value
        };
        
        // Use the registerVendor endpoint with JSON data
        response = await authAPI.registerVendor(vendorData);
        
        // If there's an image, upload it separately after registration
        if (storeImage) {
          // You'll need to implement this endpoint on your backend
          // const formData = new FormData();
          // formData.append('storeImage', storeImage);
          // await authAPI.uploadStoreImage(response.data.user.id, formData);
        }
      } else {
        // Regular customer registration
        response = await authAPI.register(data);
      }
      
      setMessage(response.data.message || 'Registration successful!');
      
      // Auto-login after successful registration
      if (response.data.token && response.data.user) {
        login(response.data.user, response.data.token);
        
        // Redirect based on user type
        setTimeout(() => {
          navigate(data.userType === 'vendor' ? '/vendor-dashboard' : '/products');
        }, 1500);
      }
    } catch (error) {
      // Enhanced error handling
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Registration failed. Please try again.';
      setMessage(errorMessage);
      setIsError(true);
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join E-Sabi Market - A product of Sales Drive Limited
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                {...register("name", { 
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <input
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <div>
              <select
                {...register("userType", { required: "Please select a user type" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              >
                <option value="">Select User Type</option>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
              {errors.userType && <p className="text-red-500 text-xs mt-1">{errors.userType.message}</p>}
            </div>
          </div>

          {/* Vendor-specific fields (appear only when vendor is selected) */}
          {userType === 'vendor' && (
            <div className="space-y-4 p-4 bg-green-50 rounded-md border border-green-200">
              <h3 className="text-sm font-medium text-green-800">Vendor Store Information</h3>
              <div>
                <input
                  {...register("storeName", { 
                    required: userType === 'vendor' ? "Store name is required" : false
                  })}
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Store Name"
                />
                {errors.storeName && <p className="text-red-500 text-xs mt-1">{errors.storeName.message}</p>}
              </div>
              <div>
                <textarea
                  {...register("storeDescription", { 
                    required: userType === 'vendor' ? "Store description is required" : false,
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters"
                    }
                  })}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Store Description"
                  rows="2"
                />
                {errors.storeDescription && <p className="text-red-500 text-xs mt-1">{errors.storeDescription.message}</p>}
              </div>
              <div>
                <textarea
                  {...register("storeAddress", { 
                    required: userType === 'vendor' ? "Store address is required" : false
                  })}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Store Address"
                  rows="2"
                />
                {errors.storeAddress && <p className="text-red-500 text-xs mt-1">{errors.storeAddress.message}</p>}
              </div>
              <div>
                <input
                  {...register("storePhone", { 
                    required: userType === 'vendor' ? "Store phone number is required" : false,
                    pattern: {
                      value: /^[0-9+-\s]+$/,
                      message: "Please enter a valid phone number"
                    }
                  })}
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Store Phone Number"
                />
                {errors.storePhone && <p className="text-red-500 text-xs mt-1">{errors.storePhone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Image</label>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-green-500 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {storeImagePreview && (
                    <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-300">
                      <img src={storeImagePreview} alt="Store preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className={`rounded-md p-4 ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <p className="text-sm">{message}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>

          <div className="text-center text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;