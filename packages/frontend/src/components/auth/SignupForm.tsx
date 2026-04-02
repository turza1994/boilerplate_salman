import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, SignupFormData } from '@/lib/validation'
import { apiClient } from '@/lib/apiClient'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import '@/styles/auth.css'

export function SignupForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    setSubmitError(null)

    try {
      const response = await apiClient.signup(data)

      if (response.success && response.data) {
        navigate('/login?message=signup-success')
      } else {
        throw new Error(response.message || 'Signup failed')
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='auth-wrapper'>
      <div className='auth-shape auth-shape-one'>
        <img
          src='/assets/images/shape1.svg'
          alt=''
          className='auth-shape-img'
        />
        <img
          src='/assets/images/dark_shape.svg'
          alt=''
          className='auth-shape-dark'
        />
      </div>
      <div className='auth-shape auth-shape-two'>
        <img
          src='/assets/images/shape2.svg'
          alt=''
          className='auth-shape-img'
        />
        <img
          src='/assets/images/dark_shape1.svg'
          alt=''
          className='auth-shape-dark'
        />
      </div>
      <div className='auth-shape auth-shape-three'>
        <img
          src='/assets/images/shape3.svg'
          alt=''
          className='auth-shape-img'
        />
        <img
          src='/assets/images/dark_shape2.svg'
          alt=''
          className='auth-shape-dark'
        />
      </div>

      <div className='max-w-[1200px] mx-auto px-4'>
        <div className='flex items-center flex-wrap'>
          <div className='hidden lg:block lg:w-2/3'>
            <div className='text-center'>
              <img
                src='/assets/images/registration.png'
                alt='Registration'
                className='auth-hero-img mx-auto'
              />
            </div>
          </div>
          <div className='w-full lg:w-1/3'>
            <div className='auth-card'>
              <img
                src='/assets/images/logo.svg'
                alt='Logo'
                className='auth-logo'
              />
              <p className='auth-card-para'>Get Started Now</p>
              <h4 className='auth-card-title'>Registration</h4>

              <button type='button' className='auth-google-btn'>
                <img
                  src='/assets/images/google.svg'
                  alt='Google'
                  className='auth-google-btn-icon'
                />
                <span>Register with google</span>
              </button>

              <div className='auth-divider'>
                <span>Or</span>
              </div>

              {submitError && (
                <div className='auth-alert auth-alert-error'>
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='auth-field'>
                  <label htmlFor='signup-email'>Email</label>
                  <input
                    {...register('email')}
                    id='signup-email'
                    type='email'
                    className='auth-input'
                    autoComplete='email'
                  />
                  {errors.email && (
                    <p className='auth-error'>{errors.email.message}</p>
                  )}
                </div>

                <div className='auth-field'>
                  <label htmlFor='signup-password'>Password</label>
                  <input
                    {...register('password')}
                    id='signup-password'
                    type='password'
                    className='auth-input'
                    autoComplete='new-password'
                  />
                  {errors.password && (
                    <p className='auth-error'>{errors.password.message}</p>
                  )}
                </div>

                <div className='auth-field'>
                  <label htmlFor='signup-repeat-password'>
                    Repeat Password
                  </label>
                  <input
                    id='signup-repeat-password'
                    type='password'
                    className='auth-input'
                    autoComplete='new-password'
                  />
                </div>

                <div className='auth-row auth-form-check'>
                  <label className='auth-radio-label'>
                    <input
                      type='radio'
                      className='auth-radio'
                      name='terms'
                      defaultChecked
                    />
                    I agree to terms & conditions
                  </label>
                </div>

                <div className='auth-submit-wrap'>
                  <button
                    type='submit'
                    className='auth-submit-btn'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                  </button>
                </div>
              </form>

              <p className='auth-bottom-text'>
                Already have an account?{' '}
                <Link to='/login'>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
