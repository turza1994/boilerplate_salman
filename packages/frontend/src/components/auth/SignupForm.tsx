import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signupSchema } from '@/lib/validation'
import { apiClient } from '@/lib/apiClient'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import '@/styles/auth.css'

const signupFormSchema = signupSchema
  .extend({
    repeatPassword: z.string().min(1, 'Please repeat your password'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  })

type SignupFormDataType = z.infer<typeof signupFormSchema>

export function SignupForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormDataType>({
    resolver: zodResolver(signupFormSchema),
  })

  const onSubmit = async (data: SignupFormDataType) => {
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
        <div className='flex flex-wrap items-center gap-8 lg:gap-12'>
          <div className='hidden lg:block lg:w-1/2'>
            <div className='text-center'>
              <img
                src='/assets/images/registration.png'
                alt='Registration'
                className='mx-auto auth-hero-img'
              />
            </div>
          </div>
          <div className='w-full lg:w-5/12'>
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
                <div className='auth-alert auth-alert-error'>{submitError}</div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='auth-name-row'>
                  <div className='auth-field'>
                    <label htmlFor='signup-first-name'>First Name</label>
                    <input
                      {...register('firstName')}
                      id='signup-first-name'
                      type='text'
                      className='auth-input'
                      autoComplete='given-name'
                    />
                    {errors.firstName && (
                      <p className='auth-error'>{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className='auth-field'>
                    <label htmlFor='signup-last-name'>Last Name</label>
                    <input
                      {...register('lastName')}
                      id='signup-last-name'
                      type='text'
                      className='auth-input'
                      autoComplete='family-name'
                    />
                    {errors.lastName && (
                      <p className='auth-error'>{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

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
                  <div className='auth-password-wrap'>
                    <input
                      {...register('password')}
                      id='signup-password'
                      type={showPassword ? 'text' : 'password'}
                      className='auth-input'
                      autoComplete='new-password'
                    />
                    <button
                      type='button'
                      className='auth-password-toggle'
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='auth-error'>{errors.password.message}</p>
                  )}
                </div>

                <div className='auth-field'>
                  <label htmlFor='signup-repeat-password'>
                    Repeat Password
                  </label>
                  <div className='auth-password-wrap'>
                    <input
                      {...register('repeatPassword')}
                      id='signup-repeat-password'
                      type={showRepeatPassword ? 'text' : 'password'}
                      className='auth-input'
                      autoComplete='new-password'
                    />
                    <button
                      type='button'
                      className='auth-password-toggle'
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      aria-label={
                        showRepeatPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showRepeatPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.repeatPassword && (
                    <p className='auth-error'>
                      {errors.repeatPassword.message}
                    </p>
                  )}
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
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
