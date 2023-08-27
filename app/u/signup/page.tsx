'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { USignUpSchemaType, schema } from './schema'
import { useForm, FormProvider } from 'react-hook-form'

import Container from '@/components/shared/layout/Container'
import { Input } from '@/components/shared/form/Form'
import Button from '@/components/shared/common/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Message from '@/components/shared/common/Message'
import { useState } from 'react'
import Link from 'next/link'

interface USignUpRoute {}

export const dynamic = 'force-dynamic'

export default function USignInRoute({}: USignUpRoute) {
  const methods = useForm<USignUpSchemaType>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const sb = createClientComponentClient()
  const [formError, setFormError] = useState('')
  const router = useRouter()

  const handleSignup = async ({ email, password }: USignUpSchemaType) => {
    try {
      const { error } = await sb.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        throw new Error(error.message)
      }
      setFormError('')
      toast.success('Sign up success')
      router.push('/')
    } catch (err: any) {
      setFormError(err.message)
    }
  }
  return (
    <Container>
      <div className="h-screen flex justify-center items-center">
        <div className="w-[300px] animate-in">
          <Link href="/" className="mb-4 text-sm text-orange-600 inline-block">
            Back to Home
          </Link>

          {formError && (
            <Message type="error" className="mb-4">
              <p>{formError}</p>
            </Message>
          )}
          <h3 className="text-lg font-medium">Sign Up</h3>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSignup)}>
              <Input type="text" name="email" id="email" placeholder="Enter your email" />
              <Input type="password" name="password" id="password" placeholder="Enter your password" />
              <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Enter your password" />
              <Button block type="submit" variant="primary" busy={methods.formState?.isSubmitting}>
                Sign up
              </Button>
              <p className="text-sm mt-2 text-foreground">
                Already have an account? <Link href="/u/signin">Signin</Link>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  )
}
