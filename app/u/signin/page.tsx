'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { USignInSchemaType, schema } from './schema'
import { useForm, FormProvider } from 'react-hook-form'

import Container from '@/components/shared/layout/Container'
import { FormInput } from '@/components/shared/form/Form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Message from '@/components/shared/common/Message'
import { useState } from 'react'
import Link from 'next/link'
import PhakeButton from '@/components/shared/common/Button'

interface USignInRoute {}

export const dynamic = 'force-dynamic'

export default function USignInRoute({}: USignInRoute) {
  const methods = useForm<USignInSchemaType>({
    resolver: yupResolver(schema),
  })

  const sb = createClientComponentClient()
  const [formError, setFormError] = useState('')
  const router = useRouter()

  const handleSignin = async ({ email, password }: USignInSchemaType) => {
    try {
      const { error } = await sb.auth.signInWithPassword({
        email,
        password,
        options: {},
      })
      if (error) {
        throw new Error(error.message)
      }
      setFormError('')
      toast.success('Sign in success')
      router.refresh()
    } catch (err: any) {
      setFormError(err.message)
    }
  }
  return (
    <Container>
      <div className="h-screen flex justify-center items-center">
        <div className="w-[300px] animate-in">
          <Link href="/" className="mb-4 text-sm text-neutral-900 inline-block">
            Back to Home
          </Link>

          {formError && (
            <Message type="error" className="mb-4">
              <p>{formError}</p>
            </Message>
          )}
          <h3 className="text-lg font-medium">Sign In</h3>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSignin)}>
              <FormInput type="text" name="email" id="email" placeholder="Enter your email" />
              <FormInput type="password" name="password" id="password" placeholder="Enter your password" />
              <PhakeButton block type="submit" busy={methods.formState?.isSubmitting}>
                Sign in
              </PhakeButton>
              <p className="text-sm mt-2 text-neutral-500">
                Don't have an account?{' '}
                <Link href="/u/signup" className="text-neutral-900 underline">
                  Sign up
                </Link>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  )
}
