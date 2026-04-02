import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '@/lib/validation'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import '@/styles/auth.css'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const message = searchParams.get('message')
  const showSuccessMessage = message === 'signup-success'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setSubmitError(null)

    try {
      await login(data.email, data.password)
      navigate('/feed')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Login failed')
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
                src='/assets/images/login.png'
                alt='Login'
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
              <p className='auth-card-para'>Welcome back</p>
              <h4 className='auth-card-title'>Login to your account</h4>

              <button type='button' className='auth-google-btn'>
                <img
                  src='/assets/images/google.svg'
                  alt='Google'
                  className='auth-google-btn-icon'
                />
                <span>Or sign-in with google</span>
              </button>

              <div className='auth-divider'>
                <span>Or</span>
              </div>

              {showSuccessMessage && (
                <div className='auth-alert auth-alert-success'>
                  Account created successfully! Please sign in.
                </div>
              )}

              {submitError && (
                <div className='auth-alert auth-alert-error'>
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='auth-field'>
                  <label htmlFor='login-email'>Email</label>
                  <input
                    {...register('email')}
                    id='login-email'
                    type='email'
                    className='auth-input'
                    autoComplete='email'
                  />
                  {errors.email && (
                    <p className='auth-error'>{errors.email.message}</p>
                  )}
                </div>

                <div className='auth-field'>
                  <label htmlFor='login-password'>Password</label>
                  <input
                    {...register('password')}
                    id='login-password'
                    type='password'
                    className='auth-input'
                    autoComplete='current-password'
                  />
                  {errors.password && (
                    <p className='auth-error'>{errors.password.message}</p>
                  )}
                </div>

                <div className='auth-row'>
                  <label className='auth-radio-label'>
                    <input
                      type='radio'
                      className='auth-radio'
                      name='remember'
                      defaultChecked
                    />
                    Remember me
                  </label>
                  <span className='auth-forgot'>Forgot password?</span>
                </div>

                <div className='auth-submit-wrap'>
                  <button
                    type='submit'
                    className='auth-submit-btn'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login now'}
                  </button>
                </div>
              </form>

              <p className='auth-bottom-text'>
                Dont have an account?{' '}
                <Link to='/signup'>Create New Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
